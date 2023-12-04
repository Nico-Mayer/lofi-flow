<script>
	// @ts-nocheck
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'

	export let player
	export let videoId = ''

	const dispatch = createEventDispatcher()
	const ytPlayerId = 'youtube-player'

	onMount(() => {
		function load() {
			player = new YT.Player(ytPlayerId, {
				height: '360px',
				width: '640px',
				videoId,
				playerVars: { autoplay: 1, rel: 0, controls: 0 },
				events: {
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange,
				},
			})
		}

		if (window.YT) {
			load()
		} else {
			window.onYouTubeIframeAPIReady = load
		}
	})

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

<div class="video" id={ytPlayerId} />

<style scoped>
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
