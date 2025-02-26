<script lang="ts">
	import Controls from '$lib/Controls.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import RadioList from '$lib/RadioList.svelte';
	import ChangeAnimation from '$lib/effects/ChangeAnimation.svelte';
	import Crt from '$lib/effects/Crt.svelte';
	import Darken from '$lib/effects/Darken.svelte';
	import Vignette from '$lib/effects/Vignette.svelte';
	import {
		activeRadio,
		dailyRadios,
		favorites,
		lastSkipDirection,
		lowPowerMode,
		playerError,
		playerState,
		radioListOpen,
		radioSwitching,
		volume
	} from '$lib/store.svelte';
	import { inlineSvg, ytPlayerStateCode } from '$lib/utils';
	import { onMount, untrack } from 'svelte';
	import '../app.css';

	const ytPlayerId = 'youtube-player';

	let player: YT.Player | null = $state(null);

	$effect(() => {
		if (activeRadio.value !== null) {
			untrack(() => {
				if (player && activeRadio.value && !radioSwitching.value) {
					player.loadVideoById(activeRadio.value.id.videoId);
					radioSwitching.value = true;
				}
			});
		}
	});

	$effect(() => {
		if (volume.value !== null) {
			untrack(() => {
				if (player) {
					player.setVolume(volume.value);
				}
			});
		}
	});

	$effect(() => {
		if (!player) return;

		if (playerState.value === ytPlayerStateCode('ended')) {
			untrack(() => {
				if (!activeRadio.value) return;

				const radios = [...favorites.value, ...dailyRadios.value];
				const index = radios.indexOf(activeRadio.value);

				if (index === radios.length) {
					activeRadio.value = radios[0];
				}

				activeRadio.value = radios[index + 1];
			});
		}
	});

	onMount(async () => {
		const response = await fetch('/api/dailyRadio', {
			method: 'GET'
		});

		dailyRadios.value = await response.json();

		if (dailyRadios.value === null) {
			throw new Error('No radios found');
		}

		if (activeRadio.value === null) {
			activeRadio.value = dailyRadios.value[0];
		}

		player = new YT.Player(ytPlayerId, {
			height: '360px',
			width: '640px',
			videoId: activeRadio.value.id.videoId,
			playerVars: { autoplay: 0, rel: 0, controls: 0 },
			events: {
				onReady: onPlayerReady,
				onError: onPlayerError,
				onStateChange: onPlayerStateChange
			}
		});
	});

	function onPlayerStateChange(e: YT.PlayerEvent): void {
		playerState.value = e.target.getPlayerState();

		if (playerState.value === YT.PlayerState.PLAYING) {
			playerError.value = false;
			radioSwitching.value = false;
		}
	}

	function onPlayerReady(): void {
		if (player === null) return;
		player.pauseVideo();
		player.setVolume(volume.value);
		playerState.value = player.getPlayerState();
	}

	function onPlayerError(): void {
		playerError.value = true;
		radioSwitching.value = false;

		const failedRadio = activeRadio.value;
		const radios = [...(favorites.value ?? []), ...(dailyRadios.value ?? [])];
		const failedRadioIndex = radios.findIndex((radio) => radio === failedRadio);

		switch (lastSkipDirection.value) {
			case 'next': {
				if (failedRadioIndex === radios.length - 1) {
					activeRadio.value = radios[0];
					return;
				}
				activeRadio.value = radios[failedRadioIndex + 1];
				break;
			}
			case 'prev': {
				if (failedRadioIndex === 0) {
					activeRadio.value = radios[radios.length - 1];
					return;
				}
				activeRadio.value = radios[failedRadioIndex - 1];
				break;
			}
			case 'none': {
				if (radios.length <= 1) return;
				let randomIndex = Math.floor(Math.random() * radios.length);

				while (randomIndex === failedRadioIndex) {
					randomIndex = Math.floor(Math.random() * radios.length);
				}
				activeRadio.value = radios[randomIndex];
				break;
			}
		}
	}

	function onPlayPause(): void {
		if (player === null) return;

		if (playerState.value === YT.PlayerState.PLAYING) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
	}

	function handleKeyDown(e: KeyboardEvent): void {
		const KEY = e.key.toLowerCase();

		if (KEY === 'l' && !radioListOpen.value) {
			lowPowerMode.value = !lowPowerMode.value;
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="flex h-full flex-col">
	<div tabindex="-1" id={ytPlayerId}></div>
	<ChangeAnimation />

	{#if lowPowerMode.value === false}
		<Darken />
		<Vignette />
		<Crt />
	{/if}

	<div class="z-5 flex size-full flex-col justify-between p-4 md:p-8">
		<Navbar />

		<div class="group m-auto hidden h-64 w-64 items-center justify-center md:flex">
			<button
				tabindex="-1"
				class="btn scale-0 transition-all duration-300 group-hover:scale-100"
				onclick={onPlayPause}
			>
				{#if playerState.value === ytPlayerStateCode('playing')}
					<svg use:inlineSvg={'https://api.iconify.design/pixelarticons:pause.svg'}></svg>
				{:else}
					<svg use:inlineSvg={'https://api.iconify.design/pixelarticons:play.svg'}></svg>
				{/if}
			</button>
		</div>

		<Controls {onPlayPause} />
	</div>

	{#if radioListOpen.value}
		<RadioList />
	{/if}
</div>
