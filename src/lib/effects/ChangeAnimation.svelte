<script lang="ts">
	import { switchingChannel } from '$lib/store/store'
	import { onMount } from 'svelte'

	let whiteNoiseEffect: HTMLAudioElement

	onMount(() => {
		whiteNoiseEffect.volume = 0.05
	})

	$: {
		if ($switchingChannel) {
			whiteNoiseEffect?.play()
		} else if (!$switchingChannel) {
			whiteNoiseEffect?.pause()
		}
	}

	function getRandomChangeImg(): string {
		const max = 6
		const random = Math.floor(Math.random() * max) + 1

		return `/gifs/change${random}.gif`
	}
</script>

<audio bind:this={whiteNoiseEffect}>
	<source src="/sounds/whiteNoise.mp3" type="audio/mp3" />
	Your browser does not support the audio tag.
</audio>

{#if $switchingChannel}
	<img
		draggable="false"
		class="absolute top-0 left-0 w-full h-full"
		src={getRandomChangeImg()}
		alt="change-screen" />
{/if}
