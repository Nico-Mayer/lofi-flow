<script lang="ts">
	import Youtube from '$lib/Youtube.svelte'
	import SidebarLeft from '$lib/SidebarLeft.svelte'
	import SidebarRight from '$lib/SidebarRight.svelte'
	import Menubar from '$lib/Menubar.svelte'
	import Center from '$lib/Center.svelte'
	import { playing, buffering, activeChannel, radio } from '$lib/stores/store'
	import { extractIDfromYTUrl } from '$lib/utils/utils'

	let player: Player

	$: $activeChannel, handleChannelChange()

	function handleChannelChange() {
		if (player) {
			player.loadVideoById(extractIDfromYTUrl($activeChannel.url))
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

<main class="relative w-screen h-screen overflow-hidden flex">
	<Youtube
		bind:player
		videoId={extractIDfromYTUrl($activeChannel.url)}
		on:stateChangeString={handleStateChange}></Youtube>

	<div
		class="text-white w-screen h-screen bg-black bg-opacity-10 transition-all duration-250 flex flex-col justify-between p-10 gap-5"
		class:bg-opacity-90={!$playing}>
		<section id="top" class="h-full flex gap-5">
			<SidebarLeft channels={$radio.channels} />

			<Center />

			<SidebarRight />
		</section>

		<section id="bot">
			<Menubar {player} />
		</section>
	</div>
</main>
