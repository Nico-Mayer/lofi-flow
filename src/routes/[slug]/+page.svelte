<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { session } from "$lib/store/store";
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
        twitchPlayer,
        playing,
        switchingChannel,
        volume,
        offline,
        radio,
        lowPowerMode,
        showChannelList,
    } from "$lib/store/store";

    import { getUser } from "$lib/utils/twitch";
    import { goto } from "$app/navigation";
    import { handleKeyDown } from "$lib/utils/controls";

    $: $activeChannel, onChannelChange();

    function onPlayerReady() {
        if ($twitchPlayer == null) return;
        $twitchPlayer.setChannel($activeChannel.id);
        $twitchPlayer.setMuted(false);
        $twitchPlayer.setVolume($volume / 100);
        $offline = false;
    }

    function onChannelChange() {
        if ($twitchPlayer == null) return;
        $twitchPlayer.setChannel($activeChannel.id);
        $offline = false;
        goto(`/${$activeChannel.id}`);
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

    onMount(async () => {
        const slug = $page.params.slug;
        if ($session?.user) {
            const user = await getUser(slug, $session);
            const channel: Channel = {
                id: user.login,
                title: user.display_name,
                description: user.display_name,
                image: user.profile_image_url,
                url: "https://www.twitch.tv/" + user.login,
            };

            $activeChannel = channel;
            if ($radio.channels.find((c) => c.id == channel.id)) return;
            $radio.channels.push(channel);
            $radio.channels = $radio.channels;
        } else {
            if ($radio.channels.find((c) => c.id == slug)) return;
            alert("You need to be logged in to navigate to custom channels.");
            goto("/");
        }
    });
</script>

<svelte:window on:keydown={handleKeyDown} />

<div>
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
</div>
