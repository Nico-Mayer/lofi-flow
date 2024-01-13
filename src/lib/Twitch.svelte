<script lang="ts">
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";

    const twitchPlayerId = "twitch_player";
    const dispatch = createEventDispatcher();

    export let twitchPlayer;

    onMount(async () => {
        twitchPlayer = new Twitch.Player(twitchPlayerId, {
            width: "100%",
            height: "100%",
            channel: "dizzy",
            autoplay: true,
            muted: false,
            controls: false,
        });

        twitchPlayer.addEventListener(Twitch.Player.READY, () =>
            onPlayerReady()
        );
        twitchPlayer.addEventListener(Twitch.Player.PLAYING, () =>
            onPlayerStateChange("play")
        );
        twitchPlayer.addEventListener(Twitch.Player.PLAYING, () =>
            onPlayerStateChange("playing")
        );
        twitchPlayer.addEventListener(Twitch.Player.PAUSE, () =>
            onPlayerStateChange("paused")
        );
    });

    function onPlayerReady() {
        dispatch("ready");
    }

    function onPlayerStateChange(event) {
        dispatch("stateChange", event);

        let strReturn = "";
        switch (event) {
            case "playing":
                console.log("IS PLAYING");
                strReturn = "PLAYING";
                break;
            case "paused":
                console.log("IS PAUSED");
                strReturn = "PAUSED";
                break;
            default:
                break;
        }

        dispatch("stateChangeString", strReturn);
    }
</script>

<svelte:head>
    <script src="https://player.twitch.tv/js/embed/v1.js"></script>
</svelte:head>

<div id={twitchPlayerId}></div>

<style>
    #twitch_player {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
    }
</style>
