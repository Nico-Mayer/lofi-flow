<script lang="ts">
    import { offline, twitchPlayer, volume } from "$lib/store/store";
    import { onMount } from "svelte";

    let whiteNoiseEffect: HTMLAudioElement;
    let mounted = false;

    onMount(() => {
        mounted = true;
        handleVolumeChange();
    });

    $: $volume, handleVolumeChange();

    $: {
        if ($offline) {
            whiteNoiseEffect?.play();
        } else if (!$offline) {
            whiteNoiseEffect?.pause();
        }
    }

    function handleVolumeChange() {
        if (!mounted) return;
        let newVolume = $volume / 100;

        whiteNoiseEffect.volume = Math.min(newVolume, 0.05);
    }

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

{#if $offline}
    <img
        draggable="false"
        class="absolute top-0 left-0 w-full h-full z-10"
        src={getRandomChangeImg()}
        alt="change-screen"
    />
{/if}
