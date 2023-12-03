<script lang="ts">
	import { volume, playing } from '$lib/stores/store'
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

<main>
	<button
		class="i-pixelarticons-play text-shadow-2xl glowing-text"
		on:click={handlePlayPause}></button>
	<span>fwfewf</span>
</main>
