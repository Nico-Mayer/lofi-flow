<script lang="ts">
    import { page } from "$app/stores";
    import ChannelList from "$lib/ChannelList.svelte";
    import Controls from "$lib/Controls.svelte";
    import Topbar from "$lib/Topbar.svelte";
    import Twitch from "$lib/Twitch.svelte";
    import VolumeSlider from "$lib/VolumeSlider.svelte";
    import ChangeAnimation from "$lib/effects/ChangeAnimation.svelte";
    import Crt from "$lib/effects/Crt.svelte";
    import Darken from "$lib/effects/Darken.svelte";
    import OfflineAnimation from "$lib/effects/OfflineAnimation.svelte";
    import Vignette from "$lib/effects/Vignette.svelte";
    import {
        activeChannel,
        buffering,
        lowPowerMode,
        offline,
        playing,
        tv,
        session,
        showChannelList,
        switchingChannel,
        twitchPlayer,
        volume,
    } from "$lib/store/store";

    import { goto } from "$app/navigation";
    import { handleKeyDown } from "$lib/utils/controls";
    import { getUser } from "$lib/utils/twitch";
    import { browser } from "$app/environment";

    $: $activeChannel, onChannelChange();
    $: $page.params.slug, checkSlug();

    let currentSlug: string;

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

    async function checkSlug() {
        if (!browser) return;
        if ($page.url.hash) return;

        const slug = $page.params.slug;
        if (slug === currentSlug) return;
        currentSlug = slug;

        const channel = $tv.channels.find((c) => c.id === slug);
        if (channel) {
            activeChannel.set(channel);
            return;
        }

        if ($session?.user) {
            const user = await getUser(slug, $session);
            const channel = {
                id: user.login,
                title: user.display_name,
                description: user.display_name,
                image: user.profile_image_url,
                url: `https://www.twitch.tv/${user.login}`,
            };

            $activeChannel = channel;
            if ($tv.channels.find((c) => c.id === channel.id)) return;
            $tv.channels.push(channel);
            $tv.channels = $tv.channels;
        } else {
            const channel = $tv.channels.find((c) => c.id === slug);
            if (channel) {
                activeChannel.set(channel);
                return;
            }
            alert("You need to be logged in to navigate to custom channels.");
            goto(`/${$activeChannel.id}`);
        }
    }
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
