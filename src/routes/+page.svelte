<script lang="ts">
    import ChannelList from "$lib/ChannelList.svelte";
    import Controls from "$lib/Controls.svelte";
    import IconBtn from "$lib/IconBtn.svelte";
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
    } from "$lib/store/store";

    let app: HTMLElement;

    $: $activeChannel, onChannelChange();

    function onPlayerReady() {
        if ($twitchPlayer == null) return;
        $twitchPlayer.setVolume($volume);
    }

    function onChannelChange() {
        if ($twitchPlayer == null) return;
        $twitchPlayer.setChannel($activeChannel.id);
    }

    function onPlayerStateChange(event: CustomEvent<string>) {
        console.log("Twitch player state changeeeee", event.detail);
        if ($twitchPlayer == null) return;

        const state = event.detail;
        if (state == "UNSTARTED") {
            $playing = false;
            $buffering = true;
        } else if (state == "ENDED") {
            $playing = false;
            $buffering = false;
        } else if (state == "PLAYING") {
            console.log("IS PLAYING");
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

    function handlePlayPause() {
        if ($twitchPlayer != null && !$playing) {
            $twitchPlayer.play();
        } else if ($twitchPlayer && $playing) {
            $twitchPlayer.pause();
        }
    }
</script>

<main
    bind:this={app}
    class="relative flex w-[calc(100dvw)] h-[calc(100dvh)] overflow-hidden"
    class:low-power={$lowPowerMode}
>
    <Darken />
    {#if !$lowPowerMode}
        <Crt />
        <Vignette />
    {/if}
    <ChangeAnimation />
    <!-- <Youtube
        bind:player={$player}
        on:stateChangeString={onPlayerStateChange}
        on:ready={onPlayerReady}
    ></Youtube> -->
    <Twitch
        bind:twitchPlayer={$twitchPlayer}
        on:stateChangeString={onPlayerStateChange}
        on:ready={onPlayerReady}
    />

    {#if $showChannelList}
        <ChannelList />
    {/if}

    <div
        class="absolute top-0 right-0 flex items-center justify-center w-full h-full"
    >
        <div class="flex items-center justify-center w-52 h-52 group">
            <IconBtn
                icon={$playing ? "pixelarticons:pause" : "pixelarticons:play"}
                on:click={handlePlayPause}
                class="transition-all duration-200 opacity-0 group-hover:opacity-100"
            />
        </div>
    </div>

    <div
        id="ui-wrapper"
        class="z-20 flex flex-col justify-between w-full h-full p-6 text-lg lg:text-2xl lg:p-12"
    >
        <Topbar />
        <Controls>
            <VolumeSlider />
        </Controls>
    </div>
</main>
