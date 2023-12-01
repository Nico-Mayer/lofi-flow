<script lang="ts">
	import Youtube from '$lib/Youtube.svelte'
	import Sidebar from '$lib/Sidebar.svelte'
	import { volume } from '$lib/stores/store'
	import { fly, slide } from 'svelte/transition'
	import { extractIDfromYTUrl } from '$lib/utils'

	const dummyRadio: Radio = {
		name: 'Awesome Radio',
		description: 'The best radio station on the web!',
		channels: [
			{
				name: 'Hito Lofi',
				url: 'https://www.youtube.com/watch?v=th8sZnMm9Nw',
				description: 'The hottest hits 24/7',
				socials: [
					{ name: 'Facebook', url: 'https://facebook.com/channel1' },
					{ name: 'Twitter', url: 'https://twitter.com/channel1' },
				],
			},
			{
				name: 'Channel 2',
				url: 'https://example.com/channel2',
				description: 'Classic rock and roll all day long',
				socials: [
					{
						name: 'Instagram',
						url: 'https://instagram.com/channel2',
					},
					{ name: 'YouTube', url: 'https://youtube.com/channel2' },
				],
			},
			{
				name: 'Channel 3',
				url: 'https://example.com/channel10',
				description: 'Chill vibes for a relaxing day',
				socials: [
					{
						name: 'Pinterest',
						url: 'https://pinterest.com/channel10',
					},
					{ name: 'LinkedIn', url: 'https://linkedin.com/channel10' },
				],
			},
		],
	}

	let buffering = false
	let playing = true

	interface Player {
		playVideo: () => void
		pauseVideo: () => void
		loadVideoById: (id: string) => void
		setVolume: (volume: number) => void
	}

	let player: Player

	$: $volume, handleVolumeChange()

	function handleChannelChange(e: CustomEvent) {
		let id = extractIDfromYTUrl(e.detail)
		player.loadVideoById(id)
	}

	function handleVolumeChange() {
		if (player) {
			player.setVolume($volume)
		}
	}

	function handlePlayPause() {
		if (player && !playing) {
			player.playVideo()
		} else if (player && playing) {
			player.pauseVideo()
		}
	}

	function handleStateChange(e: CustomEvent) {
		console.log(player)
		let state = e.detail
		if (state == 'UNSTARTED') {
			playing = false
			buffering = true
		}
		if (state == 'ENDED') {
			playing = false
			buffering = false
		}
		if (state == 'PLAYING') {
			playing = true
			buffering = false
		}
		if (state == 'PAUSED') {
			playing = false
			buffering = false
		}
		if (state == 'BUFFERING') {
			playing = false
			buffering = true
		}
		if (state == 'VIDEO_CUED') {
			playing = false
			buffering = true
		}
	}
</script>

<main class="relative w-screen h-screen overflow-hidden flex">
	<Youtube
		bind:player
		videoId="jfKfPfyJRdk"
		on:stateChangeString={handleStateChange}></Youtube>

	<div
		class="text-white w-screen h-screen bg-black/90 flex flex-row transition-all duration-250"
		class:playing>
		<Sidebar
			channels={dummyRadio.channels}
			on:channelClicked={handleChannelChange} />

		<div
			class="right-side h-full w-full flex flex-col justify-between p-10 pl-0">
			<div
				class="flex h-full w-full justify-center items-center relative">
				{#if buffering}
					<div
						class="flex justify-center items-center gap-4 text-4xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							><rect
								width="10"
								height="10"
								x="1"
								y="1"
								fill="currentColor"
								rx="1"
								><animate
									id="svgSpinnersBlocksShuffle30"
									fill="freeze"
									attributeName="x"
									begin="0;svgSpinnersBlocksShuffle3b.end"
									dur="0.1s"
									values="1;13" /><animate
									id="svgSpinnersBlocksShuffle31"
									fill="freeze"
									attributeName="y"
									begin="svgSpinnersBlocksShuffle38.end"
									dur="0.1s"
									values="1;13" /><animate
									id="svgSpinnersBlocksShuffle32"
									fill="freeze"
									attributeName="x"
									begin="svgSpinnersBlocksShuffle39.end"
									dur="0.1s"
									values="13;1" /><animate
									id="svgSpinnersBlocksShuffle33"
									fill="freeze"
									attributeName="y"
									begin="svgSpinnersBlocksShuffle3a.end"
									dur="0.1s"
									values="13;1" /></rect
							><rect
								width="10"
								height="10"
								x="1"
								y="13"
								fill="currentColor"
								rx="1"
								><animate
									id="svgSpinnersBlocksShuffle34"
									fill="freeze"
									attributeName="y"
									begin="svgSpinnersBlocksShuffle30.end"
									dur="0.1s"
									values="13;1" /><animate
									id="svgSpinnersBlocksShuffle35"
									fill="freeze"
									attributeName="x"
									begin="svgSpinnersBlocksShuffle31.end"
									dur="0.1s"
									values="1;13" /><animate
									id="svgSpinnersBlocksShuffle36"
									fill="freeze"
									attributeName="y"
									begin="svgSpinnersBlocksShuffle32.end"
									dur="0.1s"
									values="1;13" /><animate
									id="svgSpinnersBlocksShuffle37"
									fill="freeze"
									attributeName="x"
									begin="svgSpinnersBlocksShuffle33.end"
									dur="0.1s"
									values="13;1" /></rect
							><rect
								width="10"
								height="10"
								x="13"
								y="13"
								fill="currentColor"
								rx="1"
								><animate
									id="svgSpinnersBlocksShuffle38"
									fill="freeze"
									attributeName="x"
									begin="svgSpinnersBlocksShuffle34.end"
									dur="0.1s"
									values="13;1" /><animate
									id="svgSpinnersBlocksShuffle39"
									fill="freeze"
									attributeName="y"
									begin="svgSpinnersBlocksShuffle35.end"
									dur="0.1s"
									values="13;1" /><animate
									id="svgSpinnersBlocksShuffle3a"
									fill="freeze"
									attributeName="x"
									begin="svgSpinnersBlocksShuffle36.end"
									dur="0.1s"
									values="1;13" /><animate
									id="svgSpinnersBlocksShuffle3b"
									fill="freeze"
									attributeName="y"
									begin="svgSpinnersBlocksShuffle37.end"
									dur="0.1s"
									values="1;13" /></rect
							></svg>
						<span class="tracking-widest">Buffering</span>
					</div>
				{/if}

				{#if playing}
					<div
						in:fly={{ x: 1000, duration: 5000 }}
						out:fly={{ x: 1000, duration: 1000 }}
						class="absolute bottom-10 right-0 p-4 border border-white/10 rounded">
						<span class="heading">Name</span>
					</div>
				{/if}
			</div>
			<div
				class="flex rounded border border-white/10 items-center justify-center gap-4 p-4 text-lg">
				<button class="flex justify-center items-center gap-2">
					<input
						type="range"
						class="w-24 h-1 pointer-events-none opacity-0" />
					<div class="i-mdi-shuffle-variant"></div>
				</button>

				<button
					on:click={handlePlayPause}
					class="flex justify-center items-center text-3xl">
					{#if playing}
						<div class="i-mdi-pause"></div>
					{:else}
						<div class="i-mdi-play"></div>
					{/if}
				</button>

				<div class="flex justify-center items-center gap-2">
					<div class="i-mdi-volume"></div>
					<input
						type="range"
						min="0"
						max="100"
						bind:value={$volume}
						on:change={handleVolumeChange}
						class="w-24 h-1 bg-white/10 rounded-full appearance-none outline-none cursor-pointer" />
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.playing {
		background: rgb(0, 0, 0, 0.1);
	}
</style>
