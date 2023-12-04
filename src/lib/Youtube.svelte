<script>
	// @ts-nocheck
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	import { loadError } from '$lib/stores/store'

	export let player
	export let videoId = ''

	const dispatch = createEventDispatcher()
	const ytPlayerId = 'youtube-player'
	const errTimeout = 1500

	onMount(() => {
		function load() {
			player = new YT.Player(ytPlayerId, {
				height: '360px',
				width: '640px',
				videoId,
				playerVars: { autoplay: 1, rel: 0, controls: 0 },
				events: {
					onError,
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange,
				},
			})
		}

		if (window.YT.ready) {
			load()
		} else {
			window.onYouTubeIframeAPIReady = load
		}
	})

	function onError(event) {
		$loadError = true
		setTimeout(() => {
			$loadError = false
		}, errTimeout)
	}

	function onPlayerReady(event) {
		dispatch('ready', event)
	}

	function onPlayerStateChange({ data }) {
		dispatch('stateChange', data)

		let strReturn = ''
		if (data == -1) {
			strReturn = 'UNSTARTED'
		}
		if (data == 0) {
			strReturn = 'ENDED'
		}
		if (data == 1) {
			strReturn = 'PLAYING'
		}
		if (data == 2) {
			strReturn = 'PAUSED'
		}
		if (data == 3) {
			strReturn = 'BUFFERING'
		}
		if (data == 5) {
			strReturn = 'VIDEO_CUED'
		}

		dispatch('stateChangeString', strReturn)
	}
</script>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

{#if $loadError}
	<div class="err flex justify-center items-center glowing-text gap-4">
		<svg
			class="glow"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			><rect width="10" height="10" x="1" y="1" fill="#ffffff" rx="1"
				><animate
					id="svgSpinnersBlocksShuffle30"
					fill="freeze"
					attributeName="x"
					begin="0;svgSpinnersBlocksShuffle3b.end"
					dur="0.2s"
					values="1;13" /><animate
					id="svgSpinnersBlocksShuffle31"
					fill="freeze"
					attributeName="y"
					begin="svgSpinnersBlocksShuffle38.end"
					dur="0.2s"
					values="1;13" /><animate
					id="svgSpinnersBlocksShuffle32"
					fill="freeze"
					attributeName="x"
					begin="svgSpinnersBlocksShuffle39.end"
					dur="0.2s"
					values="13;1" /><animate
					id="svgSpinnersBlocksShuffle33"
					fill="freeze"
					attributeName="y"
					begin="svgSpinnersBlocksShuffle3a.end"
					dur="0.2s"
					values="13;1" /></rect
			><rect width="10" height="10" x="1" y="13" fill="#ffffff" rx="1"
				><animate
					id="svgSpinnersBlocksShuffle34"
					fill="freeze"
					attributeName="y"
					begin="svgSpinnersBlocksShuffle30.end"
					dur="0.2s"
					values="13;1" /><animate
					id="svgSpinnersBlocksShuffle35"
					fill="freeze"
					attributeName="x"
					begin="svgSpinnersBlocksShuffle31.end"
					dur="0.2s"
					values="1;13" /><animate
					id="svgSpinnersBlocksShuffle36"
					fill="freeze"
					attributeName="y"
					begin="svgSpinnersBlocksShuffle32.end"
					dur="0.2s"
					values="1;13" /><animate
					id="svgSpinnersBlocksShuffle37"
					fill="freeze"
					attributeName="x"
					begin="svgSpinnersBlocksShuffle33.end"
					dur="0.2s"
					values="13;1" /></rect
			><rect width="10" height="10" x="13" y="13" fill="#ffffff" rx="1"
				><animate
					id="svgSpinnersBlocksShuffle38"
					fill="freeze"
					attributeName="x"
					begin="svgSpinnersBlocksShuffle34.end"
					dur="0.2s"
					values="13;1" /><animate
					id="svgSpinnersBlocksShuffle39"
					fill="freeze"
					attributeName="y"
					begin="svgSpinnersBlocksShuffle35.end"
					dur="0.2s"
					values="13;1" /><animate
					id="svgSpinnersBlocksShuffle3a"
					fill="freeze"
					attributeName="x"
					begin="svgSpinnersBlocksShuffle36.end"
					dur="0.2s"
					values="1;13" /><animate
					id="svgSpinnersBlocksShuffle3b"
					fill="freeze"
					attributeName="y"
					begin="svgSpinnersBlocksShuffle37.end"
					dur="0.2s"
					values="1;13" /></rect
			></svg>
		<span class="glowing-text">
			...error loading channel, connect to different one
		</span>
	</div>
{/if}

<div class="video" id={ytPlayerId} />

<style scoped>
	.err {
		z-index: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: black;
	}

	.video {
		z-index: -1;
		pointer-events: none;
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
	}

	@media (max-aspect-ratio: 16 / 9) {
		.video {
			width: 177.78vh;
		}
	}
	@media (min-aspect-ratio: 16 / 9) {
		.video {
			height: 56.25vw;
		}
	}
</style>
