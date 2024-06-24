<script lang="ts">
	import { radioSwitching } from '$lib/store.svelte';
	import { onMount } from 'svelte';

	let whiteNoiseEffect: HTMLAudioElement;

	onMount(() => {
		whiteNoiseEffect.volume = 0.05;
	});

	$effect(() => {
		if (radioSwitching.value) {
			whiteNoiseEffect?.play();
		} else if (!radioSwitching.value) {
			whiteNoiseEffect.currentTime = 0;
			whiteNoiseEffect?.pause();
		}
	});

	function getRandomChangeImg(): string {
		const max = 6;
		const random = Math.floor(Math.random() * max) + 1;

		return `/gifs/change${random}.gif`;
	}
</script>

<audio bind:this={whiteNoiseEffect}>
	<source src="/sounds/whiteNoise.mp3" type="audio/mp3" />
	Your browser does not support the audio tag.
</audio>

{#if radioSwitching.value}
	<img
		draggable="false"
		class="absolute left-0 top-0 h-full w-full"
		src={getRandomChangeImg()}
		alt="change-screen"
	/>
{/if}
