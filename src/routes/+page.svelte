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
		if (activeRadio.value !== null) {
			untrack(() => {
				if (player && activeRadio.value && !radioSwitching.value) {
					player.loadVideoById(activeRadio.value.id.videoId);
					radioSwitching.value = true;
				}
			});
		}
	});

	$effect(() => {
		if (volume.value !== null) {
			untrack(() => {
				if (player) {
					player.setVolume(volume.value);
				}
			});
		}
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

	function onPlayerStateChange(e: YT.PlayerEvent): void {
		playerState.value = e.target.getPlayerState();

		if (playerState.value === YT.PlayerState.PLAYING) {
			playerError.value = false;
			radioSwitching.value = false;
		}
	}

	function onPlayerReady(): void {
		if (player === null) return;
		player.setVolume(volume.value);
	}

	function onPlayerError(): void {
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

	function onPlayPause(): void {
		if (player === null) return;

		if (playerState.value === YT.PlayerState.PLAYING) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
	}
</script>

``<div class="flex h-full flex-col">
	<div tabindex="-1" id={ytPlayerId}></div>
	<ChangeAnimation />

	<Darken />
	<Vignette />
	<Crt />

	<div class="z-5 flex size-full flex-col p-4 md:p-8">
		<Navbar />
		<main class="flex flex-1 items-center justify-center">
			<div class="group hidden h-64 w-64 items-center justify-center md:flex">
				<button
					tabindex="-1"
					class="btn scale-0 transition-all duration-300 group-hover:scale-100"
					onclick={onPlayPause}
				>
					{#if playerState.value === YT.PlayerState.PLAYING}
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
							<path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
							<path fill="currentColor" d="M8 5v14l11-7z" />
						</svg>
					{/if}
				</button>
			</div>
		</main>
		<Controls {onPlayPause} />
	</div>

	{#if radioListOpen.value}
		<RadioList />
	{/if}
</div>
