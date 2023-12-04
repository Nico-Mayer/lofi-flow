<script lang="ts">
	import { volume, playing, buffering } from '$lib/stores/store'
	import { activeChannel, radio } from '$lib/stores/store'

	export let player: Player
	export let videoData: VideoData

	let muted = false

	$: $volume, handleVolumeChange()
	$: {
		if (videoData?.errorCode !== null) {
			randomChannel()
		}
	}

	function removeFormattedTitle(title: string) {
		if (!title) return
		return title.replace(/[^a-zA-Z0-9 ]/g, '')
	}

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

	function changeChannel(offset: number) {
		if (player) {
			const activeChannelIndex = $radio.channels.findIndex(
				(channel) => channel.id === $activeChannel.id
			)

			const totalChannels = $radio.channels.length
			const newChannelIndex =
				(activeChannelIndex + offset + totalChannels) % totalChannels

			$activeChannel = $radio.channels[newChannelIndex]
		}
	}

	function randomChannel() {
		if (player) {
			let randomChannelIndex = Math.floor(
				Math.random() * $radio.channels.length
			)

			while (randomChannelIndex === $activeChannel.id) {
				randomChannelIndex = Math.floor(
					Math.random() * $radio.channels.length
				)
			}

			$activeChannel = $radio.channels[randomChannelIndex]
		}
	}
</script>

<main class="flex items-center justify-between">
	<section class="flex flex-1"></section>

	<section class="flex items-center justify-center gap-4 flex-1 select-none">
		<button on:click={randomChannel}>
			<img class="glow h-6" src="/icons/shuffle.svg" alt="shuffle-icon" />
		</button>
		<button on:click={handlePlayPause}>
			{#if $playing}
				<img class="glow" src="/icons/pause.svg" alt="pause-icon" />
			{:else}
				<img class="glow" src="/icons/play.svg" alt="play-icon" />
			{/if}
		</button>

		<div class="flex items-center justify-center gap-1">
			<!-- <img class="glow h-6" src="/icons/volumeUp.svg" alt="volumeUp" />

			<div class="volume-slider flex gap-1">
				<div class="h-4 w-2 bg-white glow"></div>
				<div class="h-4 w-2 bg-white glow"></div>
				<div class="h-4 w-2 bg-white glow"></div>
				<div class="h-4 w-2 bg-white glow"></div>
				<div class="h-4 w-2 bg-white glow opacity-30"></div>
				<div class="h-4 w-2 bg-white glow opacity-30"></div>
			</div> -->

			<button on:click={() => changeChannel(-1)}>
				<img class="glow h-6" src="/icons/prev.svg" alt="prev-icon" />
			</button>

			<button on:click={() => changeChannel(1)}>
				<img class="glow h-6" src="/icons/next.svg" alt="next-icon" />
			</button>
		</div>
	</section>

	<section class="flex flex-1 items-center gap-4 justify-end">
		<p class="glowing-text">
			{#if $buffering}
				...buffering
			{:else if !$playing}
				...paused
			{:else}
				{removeFormattedTitle(videoData?.title.substring(0, 64))}
			{/if}
		</p>

		{#if $buffering}
			<img
				class="glow h-6"
				src="/icons/loading.svg"
				alt="loading-spinner" />
		{:else if $playing}
			<img
				class="glow h-6"
				src="/icons/playing.svg"
				alt="playing-spinner" />
		{:else if !$playing}
			<div class="h-6 w-6"></div>
		{/if}
	</section>
</main>
