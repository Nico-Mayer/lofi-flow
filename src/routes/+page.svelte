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
		dailyRadio,
		playerState,
		radioListOpen,
		volume
	} from '$lib/store.svelte';
	import { onMount } from 'svelte';
	import '../app.css';

	const ytPlayerId = 'youtube-player';
	let player: Player;

	onMount(() => {
		player = new YT.Player(ytPlayerId, {
			height: '360px',
			width: '640px',
			videoId: activeRadioID.value != '' ? activeRadioID.value : dailyRadio.value.radios[0],
			playerVars: { autoplay: 1, rel: 0, controls: 0 },
			events: {
				onReady: playerReady,
				onError: (e) => console.log('Error', e),
				onStateChange: playerStateChange
			}
		}) as Player;
	});

	function playerStateChange(e: YT.PlayerEvent) {
		playerState.value = e.target.getPlayerState();

		if (playerState.value === YT.PlayerState.PLAYING) {
			activeRadioData.value = player.getVideoData();
			activeRadioID.value = activeRadioData.value.video_id;
		}
	}

	function playerReady(e: YT.PlayerEvent) {
		player.setVolume(volume.value);
		activeRadioData.value = player.getVideoData();
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
