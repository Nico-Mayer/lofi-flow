<script lang="ts">
	import ChannelList from '$lib/ChannelList.svelte'
	import Controls from '$lib/Controls.svelte'
	import Topbar from '$lib/Topbar.svelte'
	import Youtube from '$lib/Youtube.svelte'
	import ChangeAnimation from '$lib/effects/ChangeAnimation.svelte'
	import Crt from '$lib/effects/Crt.svelte'
	import Darken from '$lib/effects/Darken.svelte'
	import Vignette from '$lib/effects/Vignette.svelte'
	import {
		activeChannel,
		buffering,
		playing,
		showChannelList,
		switchingChannel,
		volume,
	} from '$lib/stores/store'

	let player: Player
	let app: HTMLElement

	let videoData: VideoData

	$: $activeChannel, handleChannelChange()

	function onPlayerReady() {
		getPlayerInfos()
		player.setVolume($volume)
		player.setPlaybackQuality('highres')
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
</script>

<main
	bind:this={app}
	class="relative flex w-[calc(100dvw)] h-[calc(100dvh)] overflow-hidden">
	<Darken />
	<Crt />
	<Vignette />
	<ChangeAnimation />

	<Youtube
		bind:player
		videoId={$activeChannel.id}
		on:stateChangeString={handleStateChange}
		on:stateChange={getPlayerInfos}
		on:ready={onPlayerReady}>
	</Youtube>

	{#if $showChannelList}
		<ChannelList />
	{/if}

	<div
		id="ui-wrapper"
		class="z-20 flex flex-col justify-between w-full h-full p-6 text-lg lg:text-2xl lg:p-12">
		<Topbar {videoData} />

		<Controls {player} {videoData} />
	</div>
</main>
