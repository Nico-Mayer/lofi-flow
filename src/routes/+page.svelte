<script lang="ts">
    import ChannelList from "$lib/ChannelList.svelte";
    import Controls from "$lib/Controls.svelte";
    import OfflineAnimation from "$lib/effects/OfflineAnimation.svelte";
    import Topbar from "$lib/Topbar.svelte";
    import Twitch from "$lib/Twitch.svelte";
    import VolumeSlider from "$lib/VolumeSlider.svelte";
    import ChangeAnimation from "$lib/effects/ChangeAnimation.svelte";
    import Crt from "$lib/effects/Crt.svelte";
    import Darken from "$lib/effects/Darken.svelte";
    import Vignette from "$lib/effects/Vignette.svelte";
    import {
        activeChannel,
        buffering,
        lowPowerMode,
        twitchPlayer,
        playing,
        showChannelList,
        switchingChannel,
        volume,
        offline,
    } from "$lib/store/store";
    import { handleKeyDown } from "$lib/utils/controls";

    $: $activeChannel, onChannelChange();

    function onPlayerReady() {
        if ($twitchPlayer == null) return;
        $twitchPlayer.setMuted(false);
        $twitchPlayer.setVolume($volume / 100);
        $offline = false;
    }

    function onChannelChange() {
        if ($twitchPlayer == null) return;
        $twitchPlayer.setChannel($activeChannel.id);
        $offline = false;
    }

    function onPlayerStateChange(event: CustomEvent<string>) {
        if ($twitchPlayer == null) return;

        const state = event.detail;
        if (state == "UNSTARTED") {
            $playing = false;
            $buffering = true;
        } else if (state == "ENDED") {
            $playing = false;
            $buffering = false;
            $offline = true;
        } else if (state == "PLAYING") {
            $switchingChannel = false;
            $playing = true;
            $buffering = false;
        } else if (state == "PAUSED") {
            $playing = false;
            $buffering = false;
        } else if (state == "BUFFERING") {
            $playing = false;
            $buffering = true;
        } else if (state == "VIDEO_CUED") {
            $playing = false;
            $buffering = true;
        }
    }
</script>

<svelte:window on:keydown={handleKeyDown} />

<main
    class="relative flex w-[calc(100dvw)] h-[calc(100dvh)] overflow-hidden"
    class:low-power={$lowPowerMode}
>
    <Darken />
    {#if !$lowPowerMode}
        <Crt />
        <Vignette />
    {/if}
    <ChangeAnimation />
    <OfflineAnimation />

    {#if $showChannelList}
        <ChannelList />
    {/if}

    <div
        id="ui-wrapper"
        class="z-20 flex flex-col justify-between w-full h-full p-6 text-lg lg:text-2xl pointer-events-none"
    >
        <Topbar />
        <Controls>
            <VolumeSlider />
        </Controls>
    </div>

    <Twitch
        bind:twitchPlayer={$twitchPlayer}
        on:stateChangeString={onPlayerStateChange}
        on:ready={onPlayerReady}
    />
</main>
