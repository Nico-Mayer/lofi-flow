<script lang="ts">
	import Youtube from '$lib/Youtube.svelte'
	import Controls from '$lib/Controls.svelte'
	import Topbar from '$lib/Topbar.svelte'
	import Crt from '$lib/Crt.svelte'
	import { playing, buffering, activeChannel, radio } from '$lib/stores/store'
	import { extractIDfromYTUrl } from '$lib/utils/utils'

	let player: Player

	$: $activeChannel, handleChannelChange()

	function handleChannelChange() {
		if (player) {
			player.loadVideoById(extractIDfromYTUrl($activeChannel.url))
		}
	}

	function handleStateChange(e: CustomEvent) {
		let state = e.detail
		if (state == 'UNSTARTED') {
			$playing = false
			$buffering = true
		}
		if (state == 'ENDED') {
			$playing = false
			$buffering = false
		}
		if (state == 'PLAYING') {
			$playing = true
			$buffering = false
		}
		if (state == 'PAUSED') {
			$playing = false
			$buffering = false
		}
		if (state == 'BUFFERING') {
			$playing = false
			$buffering = true
		}
		if (state == 'VIDEO_CUED') {
			$playing = false
			$buffering = true
		}
	}
</script>

<main class="relative w-screen h-screen overflow-hidden flex">
	<Crt />

	<Youtube
		bind:player
		videoId={extractIDfromYTUrl($activeChannel.url)}
		on:stateChangeString={handleStateChange}></Youtube>

	<div
		class="flex flex-col w-full h-full text-white z-10 items-center justify-between p-12 glowing-text text-4xl">
		<Topbar />

		<Controls {player} />
	</div>
</main>
