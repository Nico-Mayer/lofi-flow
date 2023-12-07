<script lang="ts">
	import { volume } from '$lib/stores/store'
	import { onMount } from 'svelte'

	export let player: Player

	let fineTune = false
	let iconSrc = '/icons/volume.svg'
	let muted = false

	$: $volume, handleVolumeChange()
	$: filled = Math.floor(($volume / 100) * 7)

	onMount(() => {
		iconSrc = getIconSrc()
	})

	function toggleMute() {
		if (player) {
			if (player.isMuted()) {
				player.unMute()
				muted = false
			} else {
				player.mute()
				muted = true
			}
			iconSrc = getIconSrc()
		}
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
		if (player) {
			player.setVolume($volume)
			iconSrc = getIconSrc()
		}
	}

	function handleClick(e: MouseEvent) {
		const shiftKey = e.shiftKey

		if (shiftKey) {
			fineTune = true
		}
	}

	function handleFineTune(e: Event) {
		e.preventDefault()
		let value = (e.target as HTMLInputElement).value
		let valueAsNumber = Number(value)
		let key = (e as KeyboardEvent).key

		if (key === 'Enter') {
			fineTune = false
		}

		console.log('Value as number: ', valueAsNumber)

		if (valueAsNumber > 100) {
			valueAsNumber = 100
		} else if (valueAsNumber < 0) {
			valueAsNumber = 0
		} else if (isNaN(valueAsNumber)) {
			valueAsNumber = 0
		}
		$volume = valueAsNumber
	}
</script>

<main class="flex items-center justify-start flex-1 gap-2">
	<button
		class="flex items-center justify-center w-8 h-8"
		on:click={toggleMute}>
		<img class="h-6 glow" src={iconSrc} alt="volume-icon" />
	</button>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex gap-1 volume-slider" on:click={handleClick}>
		{#if fineTune}
			<input
				on:keyup={handleFineTune}
				on:blur={() => (fineTune = false)}
				bind:value={$volume}
				id="fineTuneVolumeInput"
				min="0"
				max="100"
				type="text"
				maxlength="3"
				class="px-2 overflow-visible bg-transparent outline-none glowing-text" />
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
