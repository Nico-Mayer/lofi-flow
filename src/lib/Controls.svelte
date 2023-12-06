<script lang="ts">
	import {
		activeChannel,
		buffering,
		playing,
		radio,
		volume,
	} from '$lib/stores/store'

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

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === ' ') {
			handlePlayPause()
		} else if (event.key === 'ArrowLeft') {
			changeChannel(-1)
		} else if (event.key === 'ArrowRight') {
			changeChannel(1)
		} else if (event.key === 'ArrowUp') {
			$volume = Math.min($volume + 10, 100)
		} else if (event.key === 'ArrowDown') {
			$volume = Math.max($volume - 10, 0)
		} else if (event.key === 'm') {
			toggleMute()
		} else if (event.key === 'r') {
			randomChannel()
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<main class="flex items-center">
	<section class="flex flex-1"></section>

	<section class="flex flex-1 gap-4 items-center justify-center select-none">
		<div class="flex gap-1 items-center justify-center">
			<button on:click={randomChannel}>
				<img
					class="h-6 glow"
					src="/icons/shuffle.svg"
					alt="shuffle-icon" />
			</button>
			<button on:click={() => changeChannel(-1)}>
				<img class="h-6 glow" src="/icons/prev.svg" alt="prev-icon" />
			</button>

			<button on:click={() => changeChannel(1)}>
				<img class="h-6 glow" src="/icons/next.svg" alt="next-icon" />
			</button>
		</div>

		<button on:click={handlePlayPause} class="h-8 w-8">
			{#if $playing}
				<img class="glow" src="/icons/pause.svg" alt="pause-icon" />
			{:else}
				<img class="glow" src="/icons/play.svg" alt="play-icon" />
			{/if}
		</button>

		<div class="flex gap-1 items-center justify-center">
			<img class="h-6 glow" src="/icons/volume.svg" alt="volume-icon" />

			<div class="flex gap-1 volume-slider">
				<div class="bg-white h-4 w-[6px] glow"></div>
				<div class="bg-white h-4 w-[6px] glow"></div>
				<div class="bg-white h-4 w-[6px] glow"></div>
				<div class="bg-white h-4 w-[6px] glow"></div>
				<div class="bg-white h-4 opacity-30 w-[6px] glow"></div>
				<div class="bg-white h-4 opacity-30 w-[6px] glow"></div>
				<div class="bg-white h-4 opacity-30 w-[6px] glow"></div>
			</div>
		</div>
	</section>

	<section class="flex flex-1 gap-4 items-center justify-end">
		<p class="glowing-text">
			{#if $buffering}
				...buffering
			{:else if !$playing}
				...paused
			{:else}
				{removeFormattedTitle(videoData?.title.substring(0, 64))}
			{/if}
		</p>

		<div class="h-6 w-6">
			{#if $buffering}
				<img
					class="h-6 glow"
					src="/icons/loading.svg"
					alt="loading-spinner" />
			{:else if $playing}
				<img
					class="h-6 glow"
					src="/icons/playing.svg"
					alt="playing-spinner" />
			{/if}
		</div>
	</section>
</main>
