<script lang="ts">
	import { clamp } from '$lib/utils';
	import {
		activeRadio,
		dailyRadios,
		favorites,
		lastSkipDirection,
		playerError,
		playerState,
		radioListOpen,
		volume
	} from './store.svelte';
	import Button from './ui/Button.svelte';

	type Props = {
		onPlayPause: () => void;
	};

	let { onPlayPause }: Props = $props();

	let playBtn: HTMLElement | null = $state(null);
	let shuffleBtn: HTMLElement | null = $state(null);
	let prevRadioBtn: HTMLElement | null = $state(null);
	let nextRadioBtn: HTMLElement | null = $state(null);
	let volumeBarContainer: HTMLElement | null = $state(null);

	function openRadioList(e: Event): void {
		e.stopPropagation();
		radioListOpen.value = true;
	}

	function getAllRadios(): Radio[] {
		return [...(favorites.value ?? []), ...(dailyRadios.value ?? [])];
	}

	function randomRadio(): void {
		lastSkipDirection.value = 'none';
		const radios = getAllRadios();
		const randomIndex = Math.floor(Math.random() * radios.length);
		const currentRadio = activeRadio.value;

		if (currentRadio === radios[randomIndex]) {
			activeRadio.value = radios[(randomIndex + 1) % radios.length];
			return;
		}

		activeRadio.value = radios[randomIndex];
	}

	function nextRadio(): void {
		lastSkipDirection.value = 'next';
		const radios = getAllRadios();
		const currentIndex = radios.findIndex(
			(radio) => radio.id.videoId === activeRadio.value?.id.videoId
		);
		activeRadio.value = radios[(currentIndex + 1) % radios.length];
	}

	function prevRadio(): void {
		lastSkipDirection.value = 'prev';
		const radios = getAllRadios();
		const currentIndex = radios.findIndex(
			(radio) => radio.id.videoId === activeRadio.value?.id.videoId
		);
		activeRadio.value = radios[(currentIndex - 1 + radios.length) % radios.length];
	}

	function changeVolume(step: number): void {
		const newVolume = volume.value + step;
		volume.value = clamp(newVolume, 0, 100);
	}

	function handleKeyDown(e: KeyboardEvent): void {
		const KEY = e.key.toLowerCase();
		const MODIFIER = e.getModifierState('Control');

		if (radioListOpen.value) return;

		switch (KEY) {
			case ' ': {
				if (document.activeElement === playBtn) {
					return;
				}
				playBtn?.focus();
				playBtn?.click();
				break;
			}
			case 'r': {
				shuffleBtn?.focus();
				shuffleBtn?.click();
				break;
			}
			case 'arrowleft':
				prevRadioBtn?.focus();
				prevRadioBtn?.click();
				break;
			case 'arrowright':
				nextRadioBtn?.focus();
				nextRadioBtn?.click();
				break;
			case 'arrowup': {
				volumeBarContainer?.focus();
				let step = 5;
				if (MODIFIER) {
					step = 2;
				}
				changeVolume(step);
				break;
			}
			case 'arrowdown': {
				volumeBarContainer?.focus();
				let step = -5;
				if (MODIFIER) {
					step = -2;
				}
				changeVolume(step);
				break;
			}

			default:
				break;
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<main>
	{#if playerError.value}
		<section class="px-2">
			<span>Radio loading error. Redirecting to a different radio station.</span>
		</section>
	{/if}

	<section class="flex items-center">
		<Button
			bind:ref={playBtn}
			aria-label={playerState.value === YT.PlayerState.PLAYING ? 'Pause video' : 'Play video'}
			onclick={onPlayPause}
		>
			{#if playerState.value === YT.PlayerState.PLAYING}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path fill="currentColor" d="M8 5v14l11-7z" />
				</svg>
			{/if}
		</Button>

		<Button bind:ref={shuffleBtn} aria-label="Shuffle music" onclick={randomRadio}>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M18 5h-2v2h2v2h-6v2h-2v6H2v2h8v-2h2v-6h6v2h-2v2h2v-2h2v-2h2V9h-2V7h-2zM2 9h6v2H2zm20 10v-2h-8v2z"
				/></svg
			>
		</Button>

		<Button bind:ref={prevRadioBtn} aria-label="Previous radio" onclick={prevRadio}>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path fill="currentColor" d="M6 4h2v16H6zm12 0h-2v2h-2v3h-2v2h-2v2h2v3h2v2h2v2h2z" /></svg
			>
		</Button>

		<Button bind:ref={nextRadioBtn} aria-label="Next radio" onclick={nextRadio}>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path fill="currentColor" d="M6 4h2v2h2v2h2v2h2v4h-2v2h-2v2H8v2H6zm12 0h-2v16h2z" /></svg
			>
		</Button>

		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			aria-label="volume slider"
			tabindex="0"
			bind:this={volumeBarContainer}
			class="volume-bar-container relative h-10 w-24"
		>
			<div
				class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-center gap-1 px-2"
			>
				<!-- eslint-disable -->
				{#each Array(10) as _, i}
					<div class="h-4 w-[6px] bg-white opacity-30" class:filled={volume.value > i * 10}></div>
				{/each}
			</div>
			<input
				tabindex="-1"
				type="range"
				step="10"
				min="0"
				max="100"
				class="absolute bottom-0 left-0 right-0 top-0 cursor-pointer opacity-0"
				bind:value={volume.value}
			/>
		</div>
	</section>

	<section class="mt-2">
		<Button class="!py-0" onclick={openRadioList}>
			{#if playerState.value === YT.PlayerState.PLAYING}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><rect width="2.8" height="12" x="1" y="6" fill="currentColor"
						><animate
							id="svgSpinnersBarsScale0"
							attributeName="y"
							begin="0;svgSpinnersBarsScale1.end-0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="0;svgSpinnersBarsScale1.end-0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					><rect width="2.8" height="12" x="5.8" y="6" fill="currentColor"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScale0.begin+0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="svgSpinnersBarsScale0.begin+0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					><rect width="2.8" height="12" x="10.6" y="6" fill="currentColor"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScale0.begin+0.2s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="svgSpinnersBarsScale0.begin+0.2s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					><rect width="2.8" height="12" x="15.4" y="6" fill="currentColor"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScale0.begin+0.3s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="svgSpinnersBarsScale0.begin+0.3s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					><rect width="2.8" height="12" x="20.2" y="6" fill="currentColor"
						><animate
							id="svgSpinnersBarsScale1"
							attributeName="y"
							begin="svgSpinnersBarsScale0.begin+0.4s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="svgSpinnersBarsScale0.begin+0.4s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					></svg
				>
				<span class="max-w-72 truncate whitespace-nowrap md:max-w-none"
					>{activeRadio.value ? activeRadio.value.snippet.title : 'loading...'}</span
				>
			{:else if playerState.value === YT.PlayerState.PAUSED}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<rect width="2.8" height="12" x="1" y="6" fill="currentColor"></rect>
					<rect width="2.8" height="12" x="5.8" y="6" fill="currentColor"></rect>
					<rect width="2.8" height="12" x="10.6" y="6" fill="currentColor"></rect>
					<rect width="2.8" height="12" x="15.4" y="6" fill="currentColor"></rect>
					<rect width="2.8" height="12" x="20.2" y="6" fill="currentColor"></rect>
				</svg>

				<span>paused</span>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><rect width="6" height="14" x="1" y="4" fill="currentColor"
						><animate
							id="svgSpinnersBarsFade0"
							fill="freeze"
							attributeName="opacity"
							begin="0;svgSpinnersBarsFade1.end-0.25s"
							dur="0.75s"
							values="1;.2"
						/></rect
					><rect width="6" height="14" x="9" y="4" fill="currentColor" opacity=".4"
						><animate
							fill="freeze"
							attributeName="opacity"
							begin="svgSpinnersBarsFade0.begin+0.15s"
							dur="0.75s"
							values="1;.2"
						/></rect
					><rect width="6" height="14" x="17" y="4" fill="currentColor" opacity=".3"
						><animate
							id="svgSpinnersBarsFade1"
							fill="freeze"
							attributeName="opacity"
							begin="svgSpinnersBarsFade0.begin+0.3s"
							dur="0.75s"
							values="1;.2"
						/></rect
					></svg
				>
				<span>buffering...</span>
			{/if}
		</Button>
	</section>
</main>

<style>
	.filled {
		opacity: 1;
		filter: var(--green-glow-drop-shadow);
	}
	.volume-bar-container:focus {
		outline: none;
		filter: var(--green-glow-drop-shadow);
	}
</style>
