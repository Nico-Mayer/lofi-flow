<script lang="ts">
	import Controls from '$lib/Controls.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import RadioList from '$lib/RadioList.svelte';
	import Crt from '$lib/effects/Crt.svelte';
	import Darken from '$lib/effects/Darken.svelte';
	import Vignette from '$lib/effects/Vignette.svelte';
	import {
		activeRadioData,
		activeRadioID,
		dailyRadios,
		playerError,
		playerState,
		radioListOpen,
		volume
	} from '$lib/store.svelte';
	import { onMount } from 'svelte';
	import '../app.css';

	const ytPlayerId = 'youtube-player';
	let player: Player;

	onMount(async () => {
		const response = await fetch('/api/dailyRadio', {
			method: 'GET'
		});

		dailyRadios.value = await response.json();

		if (dailyRadios.value === null) {
			throw new Error('No radios found');
		}

		player = new YT.Player(ytPlayerId, {
			height: '360px',
			width: '640px',
			videoId: activeRadioID.value != '' ? activeRadioID.value : dailyRadios.value[0].id.videoId,
			playerVars: { autoplay: 1, rel: 0, controls: 0 },
			events: {
				onReady: onPlayerReady,
				onError: onPlayerError,
				onStateChange: onPlayerStateChange
			}
		}) as Player;
	});

	function onPlayerStateChange(e: YT.PlayerEvent) {
		playerState.value = e.target.getPlayerState();

		if (playerState.value === YT.PlayerState.PLAYING) {
			activeRadioData.value = player.getVideoData();
			activeRadioID.value = activeRadioData.value.video_id;
			playerError.value = false;
		}
	}

	function onPlayerReady(e: YT.PlayerEvent) {
		player.setVolume(volume.value);
		activeRadioData.value = player.getVideoData();
	}

	function onPlayerError(e: YT.OnErrorEvent) {
		playerError.value = true;
	}
</script>

<div class="flex h-svh w-svw flex-col">
	<div id={ytPlayerId}></div>

	<Darken />
	<Vignette />
	<Crt />

	<div class="z-5 flex size-full flex-col p-8">
		<Navbar />
		<main class="flex-1"></main>
		<Controls {player} />
	</div>

	{#if radioListOpen.value}
		<RadioList {player} />
	{/if}
</div>
