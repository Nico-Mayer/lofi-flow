<script lang="ts">
	import Youtube from '$lib/Youtube.svelte'
	import Controls from '$lib/Controls.svelte'
	import Topbar from '$lib/Topbar.svelte'
	import Crt from '$lib/Crt.svelte'
	import { playing, buffering, activeChannel } from '$lib/stores/store'

	let player: Player
	let app: HTMLElement

	let videoData: VideoData

	$: $activeChannel, handleChannelChange()

	function getPlayerInfos() {
		videoData = player.getVideoData()
	}

	function handleChannelChange() {
		if (player) {
			player?.loadVideoById($activeChannel.id)
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

<main bind:this={app} class="relative w-screen h-screen overflow-hidden flex">
	<Crt />

	<Youtube
		bind:player
		videoId={$activeChannel.id}
		on:stateChangeString={handleStateChange}
		on:stateChange={getPlayerInfos}
		on:ready={getPlayerInfos}>
	</Youtube>

	<div class="flex flex-col w-full h-full z-20 justify-between p-12">
		<Topbar {videoData} />

		<Controls {player} {videoData} />
	</div>
</main>
