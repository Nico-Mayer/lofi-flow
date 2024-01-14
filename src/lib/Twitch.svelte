<script lang="ts">
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { handleKeyDown } from "$lib/utils/controls";
    import { activeChannel } from "$lib/store/store";

    const twitchPlayerId = "twitch_player";
    const dispatch = createEventDispatcher();

    export let twitchPlayer;
    export let channel: string = $activeChannel.id;

    let playerDiv: HTMLDivElement;

    onMount(async () => {
        twitchPlayer = new Twitch.Player(twitchPlayerId, {
            width: "100%",
            height: "100%",
            channel: channel,
            autoplay: true,
            muted: false,
            controls: false,
        });

        twitchPlayer.addEventListener(Twitch.Player.READY, () => {
            onPlayerReady();
            onPlayerStateChange("ready");
        });
        twitchPlayer.addEventListener(Twitch.Player.PLAYING, () =>
            onPlayerStateChange("play")
        );
        twitchPlayer.addEventListener(Twitch.Player.PLAYING, () =>
            onPlayerStateChange("playing")
        );
        twitchPlayer.addEventListener(Twitch.Player.PAUSE, () =>
            onPlayerStateChange("paused")
        );
        twitchPlayer.addEventListener(Twitch.Player.ENDED, () =>
            onPlayerStateChange("ended")
        );
        twitchPlayer.addEventListener(Twitch.Player.ONLINE, () =>
            onPlayerStateChange("online")
        );
        twitchPlayer.addEventListener(Twitch.Player.OFFLINE, () =>
            onPlayerStateChange("offline")
        );
    });

    function onPlayerReady() {
        dispatch("ready");
    }

    function onPlayerStateChange(event) {
        dispatch("stateChange", event);

        let strReturn = "";
        switch (event) {
            case "ready":
                strReturn = "UNSTARTED";
                break;
            case "playing":
                strReturn = "PLAYING";
                break;
            case "paused":
                strReturn = "PAUSED";
                break;
            case "ended":
                strReturn = "ENDED";
                break;
            case "online":
                strReturn = "ONLINE";
                break;
            case "offline":
                strReturn = "ENDED";
                break;
            default:
                break;
        }

        dispatch("stateChangeString", strReturn);
    }

    function handleLocalKeyDown(event: KeyboardEvent) {
        handleKeyDown(event);
    }
</script>

<svelte:head>
    <script src="https://player.twitch.tv/js/embed/v1.js"></script>
</svelte:head>

<div id={twitchPlayerId} class="twitch_player" bind:this={playerDiv}></div>

<style>
    .twitch_player {
        position: absolute;
        z-index: 0;
        width: 100vw;
        height: 100vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        pointer-events: auto;
    }

    @media (max-aspect-ratio: 16 / 9) {
        .twitch_player {
            width: 177.78vh;
        }
    }
    @media (min-aspect-ratio: 16 / 9) {
        .twitch_player {
            height: 56.25vw;
        }
    }
</style>
