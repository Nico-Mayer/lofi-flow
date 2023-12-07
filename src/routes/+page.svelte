<script lang="ts">
	import Controls from '$lib/Controls.svelte'
	import Crt from '$lib/Crt.svelte'
	import Topbar from '$lib/Topbar.svelte'
	import Youtube from '$lib/Youtube.svelte'
	import {
		activeChannel,
		buffering,
		playing,
		switchingChannel,
	} from '$lib/stores/store'
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
		if ($switchingChannel) {
			whiteNoiseEffect?.play()
		} else if (!$switchingChannel) {
			whiteNoiseEffect?.pause()
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
			$switchingChannel = false
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

	function getRandomChangeImg(): string {
		const max = 6
		const random = Math.floor(Math.random() * max) + 1

		return `/gifs/change${random}.gif`
	}
</script>

<main bind:this={app} class="relative flex w-screen h-screen overflow-hidden">
	<audio bind:this={whiteNoiseEffect}>
		<source src="/sounds/whiteNoise.mp3" type="audio/mp3" />
		Your browser does not support the audio tag.
	</audio>

	<Crt />

	{#if $switchingChannel}
		<img
			class="absolute top-0 left-0 w-full h-full"
			src={getRandomChangeImg()}
			alt="change-screen" />
	{/if}

	<Youtube
		bind:player
		videoId={$activeChannel.id}
		on:stateChangeString={handleStateChange}
		on:stateChange={getPlayerInfos}
		on:ready={getPlayerInfos}>
	</Youtube>

	<div class="z-20 flex flex-col justify-between w-full h-full p-12">
		<Topbar {videoData} />

		<Controls {player} {videoData} />
	</div>
</main>
