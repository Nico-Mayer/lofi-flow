<script lang="ts">
	import ChannelList from '$lib/ChannelList.svelte'
	import Controls from '$lib/Controls.svelte'
	import IconBtn from '$lib/IconBtn.svelte'
	import Topbar from '$lib/Topbar.svelte'
	import VolumeSlider from '$lib/VolumeSlider.svelte'
	import Youtube from '$lib/Youtube.svelte'
	import ChangeAnimation from '$lib/effects/ChangeAnimation.svelte'
	import Crt from '$lib/effects/Crt.svelte'
	import Darken from '$lib/effects/Darken.svelte'
	import Vignette from '$lib/effects/Vignette.svelte'
	import {
		activeChannel,
		buffering,
		lowPowerMode,
		player,
		playing,
		showChannelList,
		switchingChannel,
		videoData,
		volume,
	} from '$lib/store/store'

	let app: HTMLElement

	$: $activeChannel, onChannelChange()

	function onPlayerReady() {
		if ($player == null) return
		$videoData = $player.getVideoData()
		$player.setVolume($volume)
	}

	function onChannelChange() {
		if ($player == null) return
		$player.loadVideoById($activeChannel.id)
	}

	function onPlayerStateChange(e: CustomEvent) {
		if ($player == null) return
		let state = e.detail
		if (state == 'UNSTARTED') {
			$playing = false
			$buffering = true
		} else if (state == 'ENDED') {
			$playing = false
			$buffering = false
		} else if (state == 'PLAYING') {
			$switchingChannel = false
			$playing = true
			$buffering = false
		} else if (state == 'PAUSED') {
			$playing = false
			$buffering = false
		} else if (state == 'BUFFERING') {
			$playing = false
			$buffering = true
		} else if (state == 'VIDEO_CUED') {
			$playing = false
			$buffering = true
		}
		$videoData = $player.getVideoData()
	}

	function handlePlayPause() {
		if ($player != null && !$playing) {
			$player.playVideo()
		} else if ($player && $playing) {
			$player.pauseVideo()
		}
	}
</script>

<main
	bind:this={app}
	class="relative flex w-[calc(100dvw)] h-[calc(100dvh)] overflow-hidden"
	class:low-power={$lowPowerMode}>
	<Darken />
	{#if !$lowPowerMode}
		<Crt />
		<Vignette />
		<ChangeAnimation />
	{/if}

	<Youtube
		bind:player={$player}
		on:stateChangeString={onPlayerStateChange}
		on:ready={onPlayerReady}>
	</Youtube>

	{#if $showChannelList}
		<ChannelList />
	{/if}

	<div
		class="absolute top-0 right-0 flex items-center justify-center w-full h-full">
		<div class="z-50 flex items-center justify-center w-52 h-52 group">
			<IconBtn
				icon={$playing ? 'pixelarticons:pause' : 'pixelarticons:play'}
				on:click={handlePlayPause}
				class="transition-all duration-200 opacity-0 group-hover:opacity-100" />
		</div>
	</div>

	<div
		id="ui-wrapper"
		class="z-40 flex flex-col justify-between w-full h-full p-6 text-lg lg:text-2xl lg:p-12">
		<Topbar />
		<Controls>
			<VolumeSlider />
		</Controls>
	</div>
</main>
