<script lang="ts">
	import Youtube from '$lib/Youtube.svelte'
	import Sidebar from '$lib/Sidebar.svelte'
	import { volume } from '$lib/stores/store'

	let buffering = false
	let playing = true

	interface Player {
		playVideo: () => void
		pauseVideo: () => void
		loadVideoById: (id: string) => void
		setVolume: (volume: number) => void
	}

	let player: Player

	$: $volume, handleVolumeChange()

	function handleClick(e: CustomEvent) {
		let id = extractIDfromYTUrl(e.detail.url)
		player.loadVideoById(id)

		$volume = $volume + 10
	}

	function handleVolumeChange() {
		if (player) {
			player.setVolume($volume)
		}
	}

	function handlePlayPause() {
		if (player && !playing) {
			player.playVideo()
		} else if (player && playing) {
			player.pauseVideo()
		}
	}

	function extractIDfromYTUrl(url: string) {
		const regex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
		const match = url.match(regex)
		if (match) {
			return match[1]
		}
		return ''
	}

	function handleStateChange(e: CustomEvent) {
		let state = e.detail
		if (state == 'UNSTARTED') {
			playing = false
			buffering = true
		}
		if (state == 'ENDED') {
			playing = false
			buffering = false
		}
		if (state == 'PLAYING') {
			playing = true
			buffering = false
		}
		if (state == 'PAUSED') {
			playing = false
			buffering = false
		}
		if (state == 'BUFFERING') {
			playing = false
			buffering = true
		}
		if (state == 'VIDEO_CUED') {
			playing = false
			buffering = true
		}
	}
</script>

<main class="relative w-screen h-screen overflow-hidden flex">
	<Youtube
		bind:player
		videoId="jfKfPfyJRdk"
		on:stateChangeString={handleStateChange}></Youtube>

	<div class="text-white w-screen h-screen bg-black/90 flex flex-row">
		<Sidebar on:radio-clicked={handleClick} />
		<button on:click={handlePlayPause} class="w-10 h-10 bg-red-500">
			{playing ? 'Pause' : 'Play'}
		</button>

		<div class="w-82 h-82 bg-yellow-500">
			{buffering ? 'Buffering' : 'not buffering'}
		</div>
	</div>
</main>
