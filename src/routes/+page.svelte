<script lang="ts">
	import Youtube from '$lib/Youtube.svelte'
	import Controls from '$lib/Controls.svelte'
	import Topbar from '$lib/Topbar.svelte'
	import Crt from '$lib/Crt.svelte'
	import { playing, buffering, activeChannel } from '$lib/stores/store'
	import { onMount } from 'svelte'

	let player: Player
	let app: HTMLElement
	let whiteNoiseEffect: HTMLAudioElement

	let videoData: VideoData

	onMount(() => {
		whiteNoiseEffect.volume = 0.05
	})

	$: $activeChannel, handleChannelChange()
	$: {
		if ($buffering) {
			whiteNoiseEffect?.play()

			setTimeout(() => {
				whiteNoiseEffect?.pause()
			}, 300)
		}
	}

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

<main bind:this={app} class="flex h-screen w-screen relative overflow-hidden">
	<audio bind:this={whiteNoiseEffect}>
		<source src="/sounds/whiteNoise.mp3" type="audio/mp3" />
		Your browser does not support the audio tag.
	</audio>

	<Crt />

	<Youtube
		bind:player
		videoId={$activeChannel.id}
		on:stateChangeString={handleStateChange}
		on:stateChange={getPlayerInfos}
		on:ready={getPlayerInfos}>
	</Youtube>

	<div class="flex flex-col h-full w-full p-12 z-20 justify-between">
		<Topbar {videoData} />

		<Controls {player} {videoData} />
	</div>
</main>
