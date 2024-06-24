<script lang="ts">
	import Controls from '$lib/Controls.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import RadioList from '$lib/RadioList.svelte';
	import ChangeAnimation from '$lib/effects/ChangeAnimation.svelte';
	import Crt from '$lib/effects/Crt.svelte';
	import Darken from '$lib/effects/Darken.svelte';
	import Vignette from '$lib/effects/Vignette.svelte';
	import {
		activeRadio,
		dailyRadios,
		playerError,
		playerState,
		radioListOpen,
		radioSwitching,
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

		if (activeRadio.value === null) {
			activeRadio.value = dailyRadios.value[0];
		}

		player = new YT.Player(ytPlayerId, {
			height: '360px',
			width: '640px',
			videoId: activeRadio.value.id.videoId,
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
			playerError.value = false;
			radioSwitching.value = false;
		}
	}

	function onPlayerReady(e: YT.PlayerEvent) {
		player.setVolume(volume.value);
	}

	function onPlayerError(e: YT.OnErrorEvent) {
		playerError.value = true;
	}
</script>

<div class="flex h-svh w-svw flex-col">
	<div id={ytPlayerId}></div>
	<ChangeAnimation />

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
