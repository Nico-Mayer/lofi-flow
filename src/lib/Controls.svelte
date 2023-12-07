<script lang="ts">
	import {
		activeChannel,
		buffering,
		playing,
		radio,
		switchingChannel,
		volume,
	} from '$lib/stores/store'
	import VolumeSlider from './VolumeSlider.svelte'

	export let player: Player
	export let videoData: VideoData

	$: {
		if (videoData?.errorCode !== null) {
			randomChannel()
		}
	}

	function removeFormatting(title: string) {
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

	function randomTimeout() {
		const randomNumber = Math.floor(Math.random() * (310 - 220 + 1)) + 220
		setTimeout(() => {
			$switchingChannel = false
		}, randomNumber)
	}

	function changeChannel(offset: number) {
		if (player) {
			$switchingChannel = true
			randomTimeout()
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
			$switchingChannel = true
			randomTimeout()
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
			console.log('mute Player')
			//toggleMute()
		} else if (event.key === 'r') {
			randomChannel()
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<main class="flex items-center">
	<section class="flex flex-1"></section>

	<section class="flex items-center justify-center flex-1 gap-4 select-none">
		<div class="flex items-center justify-end flex-1 gap-1">
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

		<button on:click={handlePlayPause} class="w-8 h-8">
			{#if $playing}
				<img class="glow" src="/icons/pause.svg" alt="pause-icon" />
			{:else}
				<img class="glow" src="/icons/play.svg" alt="play-icon" />
			{/if}
		</button>

		<VolumeSlider {player} />
	</section>

	<section class="flex items-center justify-end flex-1 gap-4">
		<p class="glowing-text">
			{#if $buffering}
				...buffering
			{:else if !$playing}
				...paused
			{:else}
				{removeFormatting(videoData?.title.substring(0, 64))}
			{/if}
		</p>

		<div class="w-6 h-6">
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
