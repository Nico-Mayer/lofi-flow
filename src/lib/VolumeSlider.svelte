<script lang="ts">
	import { disableChannelSwitching, player, volume } from '$lib/store/store'
	import { afterUpdate, onMount } from 'svelte'

	let fineTune = false
	let iconSrc = '/icons/volume.svg'
	let muted = false
	let fineTuneInput: HTMLInputElement | undefined

	$: $volume, handleVolumeChange()
	$: filled = Math.floor(($volume / 100) * 7)

	onMount(() => {
		iconSrc = getIconSrc()
	})

	afterUpdate(() => {
		if (fineTuneInput !== document.activeElement && fineTune) {
			fineTuneInput?.focus()
			fineTuneInput?.select()
			$disableChannelSwitching = true
		}
	})

	function toggleMute() {
		if ($player == null) return
		if ($player.isMuted()) {
			$player.unMute()
			muted = false
		} else {
			$player.mute()
			muted = true
		}
		iconSrc = getIconSrc()
	}

	function getIconSrc(): string {
		if (muted) {
			return '/icons/volumeX.svg'
		} else if ($volume === 0) {
			return '/icons/volume.svg'
		} else if ($volume <= 33) {
			return '/icons/volume1.svg'
		} else if ($volume <= 66) {
			return '/icons/volume2.svg'
		} else if ($volume <= 100) {
			return '/icons/volume3.svg'
		}
		return '/icons/volume.svg'
	}

	function handleVolumeChange() {
		if ($player == null) return
		$player.setVolume($volume)
		iconSrc = getIconSrc()
	}

	function handleClick(e: MouseEvent) {
		const shiftKey = e.shiftKey

		if (shiftKey) {
			fineTune = true
		}
	}

	function handleFineTune(e: Event) {
		e.preventDefault()

		const inputElement = e.target as HTMLInputElement
		const valueAsNumber = Number(inputElement.value)
		const key = (e as KeyboardEvent).key

		if (key === 'Enter') {
			dropFocus()
		}

		let adjustedValue = isNaN(valueAsNumber)
			? 0
			: Math.max(0, Math.min(100, valueAsNumber))
		$volume = adjustedValue
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp') {
			$volume = Math.min($volume + 10, 100)
		} else if (event.key === 'ArrowDown') {
			$volume = Math.max($volume - 10, 0)
		} else if (event.key === 'm') {
			toggleMute()
		}
	}

	function dropFocus() {
		fineTune = false
		$disableChannelSwitching = false
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<main class="flex items-center justify-start flex-1 gap-2">
	<button type="button" class="btn" on:click={toggleMute}>
		<img class="icon glow" src={iconSrc} alt="volume-icon" />
	</button>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex gap-1 volume-slider" on:click={handleClick}>
		{#if fineTune}
			<input
				bind:this={fineTuneInput}
				on:keyup={handleFineTune}
				on:blur={dropFocus}
				bind:value={$volume}
				min="0"
				max="100"
				type="text"
				class="w-20 px-2 text-base"
				maxlength="3" />
		{:else}
			<div
				class="bg-white opacity-30 h-4 w-[6px] glow"
				class:filled={filled >= 1}>
			</div>
			<div
				class="bg-white opacity-30 h-4 w-[6px] glow"
				class:filled={filled >= 2}>
			</div>
			<div
				class="bg-white opacity-30 h-4 w-[6px] glow"
				class:filled={filled >= 3}>
			</div>
			<div
				class="bg-white opacity-30 h-4 w-[6px] glow"
				class:filled={filled >= 4}>
			</div>
			<div
				class="bg-white opacity-30 h-4 w-[6px] glow"
				class:filled={filled >= 5}>
			</div>
			<div
				class="bg-white opacity-30 h-4 w-[6px] glow"
				class:filled={filled >= 6}>
			</div>
			<div
				class="bg-white opacity-30 h-4 w-[6px] glow"
				class:filled={filled >= 7}>
			</div>
		{/if}
	</div>
</main>

<style>
	.filled {
		opacity: 1;
	}
</style>
