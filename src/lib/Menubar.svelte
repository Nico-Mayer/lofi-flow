<script lang="ts">
	import { volume, playing } from '$lib/stores/store'
	import { onMount } from 'svelte'
	export let player: Player

	let muted = false

	$: $volume, handleVolumeChange()

	function handlePlayPause() {
		if (player && !$playing) {
			player.playVideo()
		} else if (player && $playing) {
			player.pauseVideo()
		}
	}

	function handleVolumeChange() {
		if (player) {
			player.setVolume($volume)
		}
	}

	function toggleMute() {
		if (player) {
			if (player.isMuted()) {
				player.unMute()
				muted = false
			} else {
				player.mute()
				muted = true
			}
		}
	}
</script>

<div class="flex items-center justify-center gap-4 p-4 text-lg glass">
	<button class="flex justify-center items-center gap-2">
		<input type="range" class="w-24 h-1 pointer-events-none opacity-0" />
		<div class="i-mdi-shuffle-variant"></div>
	</button>

	<button
		on:click={handlePlayPause}
		class="flex justify-center items-center text-3xl">
		{#if $playing}
			<div class="i-mdi-pause"></div>
		{:else}
			<div class="i-mdi-play"></div>
		{/if}
	</button>

	<div class="flex justify-center items-center gap-2 anim">
		<button on:click={toggleMute} class="flex items-center justify-center">
			{#if $volume == 0 || muted}
				<div class="i-mdi-volume-off"></div>
			{:else if $volume < 50}
				<div class="i-mdi-volume-medium"></div>
			{:else}
				<div class="i-mdi-volume-high"></div>
			{/if}
		</button>

		<input
			type="range"
			min="0"
			max="100"
			bind:value={$volume}
			on:change={handleVolumeChange}
			class="w-24 h-1 bg-white/10 rounded-full appearance-none outline-none cursor-pointer" />
	</div>
</div>
