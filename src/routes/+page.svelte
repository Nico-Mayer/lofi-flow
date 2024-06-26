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
		favorites,
		playerError,
		playerState,
		radioListOpen,
		radioSwitching,
		volume
	} from '$lib/store.svelte';
	import { onMount, untrack } from 'svelte';
	import '../app.css';

	const ytPlayerId = 'youtube-player';

	let player: Player | null = $state(null);

	$effect(() => {
		activeRadio.value;

		untrack(() => {
			if (player && activeRadio.value && !radioSwitching.value) {
				player.loadVideoById(activeRadio.value.id.videoId);
				radioSwitching.value = true;
			}
		});
	});

	$effect(() => {
		volume.value;

		untrack(() => {
			if (player) {
				player.setVolume(volume.value);
			}
		});
	});

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
		if (player === null) return;
		player.setVolume(volume.value);
	}

	function onPlayerError(e: YT.OnErrorEvent) {
		playerError.value = true;
		radioSwitching.value = false;

		const failedRadio = activeRadio.value;
		const radios = [...(favorites.value ?? []), ...(dailyRadios.value ?? [])];
		const failedRadioIndex = radios.findIndex((radio) => radio === failedRadio);

		if (failedRadioIndex === radios.length - 1) {
			activeRadio.value = radios[0];
		}
		activeRadio.value = radios[failedRadioIndex + 1];
	}

	function onPlayPause() {
		if (player === null) return;

		if (playerState.value === YT.PlayerState.PLAYING) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
	}
</script>

<div class="flex h-svh w-svw flex-col">
	<div tabindex="-1" id={ytPlayerId}></div>
	<ChangeAnimation />

	<Darken />
	<Vignette />
	<Crt />

	<div class="z-5 flex size-full flex-col p-8">
		<Navbar />
		<main class="flex-1"></main>
		<Controls {onPlayPause} />
	</div>

	{#if radioListOpen.value}
		<RadioList />
	{/if}
</div>
