<script lang="ts">
	import { volume, playing, buffering } from '$lib/stores/store'
	import Icon from './Icon.svelte'
	import { activeChannel, radio } from '$lib/stores/store'

	export let player: Player
	export let videoData: VideoData

	let muted = false

	$: $volume, handleVolumeChange()

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
			const randomChannelIndex = Math.floor(
				Math.random() * $radio.channels.length
			)

			$activeChannel = $radio.channels[randomChannelIndex]
		}
	}
</script>

<main class="flex items-center justify-between">
	<section class="flex flex-1"></section>

	<section class="flex items-center justify-center gap-4 flex-1 select-none">
		<button on:click={randomChannel}>
			<Icon icon="pixelarticons:shuffle" size={'s'} />
		</button>
		<button on:click={handlePlayPause}>
			{#if $playing}
				<Icon icon="pixelarticons:pause" />
			{:else}
				<Icon icon="pixelarticons:play" />
			{/if}
		</button>

		<div class="flex items-center justify-center gap-1">
			<button on:click={() => changeChannel(-1)}>
				<Icon icon="pixelarticons:prev" size={'s'} />
			</button>

			<button on:click={() => changeChannel(1)}>
				<Icon icon="pixelarticons:next" size={'s'} />
			</button>
		</div>
	</section>

	<section class="flex flex-1 items-center gap-4 justify-end">
		<p class="text-[22px]">
			{#if $buffering}
				buffering...
			{:else}
				{removeFormattedTitle(videoData?.title.substring(0, 64))}
			{/if}
		</p>
		{#if $buffering}
			<Icon icon={'svg-spinners:blocks-shuffle-3'} size="s" />
		{:else}
			<Icon icon={'svg-spinners:bars-scale-middle'} size="s" />
		{/if}
	</section>
</main>
