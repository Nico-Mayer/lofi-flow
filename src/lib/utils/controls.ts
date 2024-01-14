import {
    activeChannel,
    buffering,
    lowPowerMode,
    twitchPlayer,
    playing,
    showChannelList,
    switchingChannel,
    volume,
    disableChannelSwitching,
    radio,
} from "$lib/store/store";
import { get } from 'svelte/store';

import { rnd } from "$lib/utils/utils";

let $twitchPlayer = get(twitchPlayer);
let $playing = get(playing);
let $buffering = get(buffering);
let $switchingChannel = get(switchingChannel);
let $disableChannelSwitching = get(disableChannelSwitching);
let $showChannelList = get(showChannelList);
let $lowPowerMode = get(lowPowerMode);
let $volume = get(volume);
let $activeChannel = get(activeChannel);
let $radio = get(radio);

twitchPlayer.subscribe((value) => ($twitchPlayer = value));
playing.subscribe((value) => ($playing = value));
buffering.subscribe((value) => ($buffering = value));
switchingChannel.subscribe((value) => ($switchingChannel = value));
disableChannelSwitching.subscribe((value) => ($disableChannelSwitching = value));
showChannelList.subscribe((value) => ($showChannelList = value));
lowPowerMode.subscribe((value) => ($lowPowerMode = value));
volume.subscribe((value) => ($volume = value));
activeChannel.subscribe((value) => ($activeChannel = value));
radio.subscribe((value) => ($radio = value));


export function handlePlayPause() {
    if ($twitchPlayer != null && !$playing) {
        $twitchPlayer.play();
    } else if ($twitchPlayer && $playing) {
        $twitchPlayer.pause();
    }
}

export function randomTimeout() {
    setTimeout(
        () => {
            switchingChannel.set(false);
        },
        rnd(220, 310)
    );
}

export function changeChannel(offset: number) {
    if ($twitchPlayer == null) return;
    console.log(offset)

    switchingChannel.set(true);
    randomTimeout();
    const activeChannelIndex = $radio.channels.findIndex(
        (channel: { id: any }) => channel.id === $activeChannel.id
    );

    const totalChannels = $radio.channels.length;
    const newChannelIndex =
        (activeChannelIndex + offset + totalChannels) % totalChannels;

    activeChannel.set($radio.channels[newChannelIndex]);
}

export function randomChannel() {
    if ($twitchPlayer == null) return;
    switchingChannel.set(true)
    randomTimeout();
    let randomChannelIndex = Math.floor(
        Math.random() * $radio.channels.length
    );

    while (randomChannelIndex === $radio.channels.indexOf($activeChannel)) {
        randomChannelIndex = Math.floor(
            Math.random() * $radio.channels.length
        );
    }

    activeChannel.set($radio.channels[randomChannelIndex]);
}

export function handleKeyDown(event: KeyboardEvent) {
    if ($disableChannelSwitching || $showChannelList) return;

    if (event.key === " ") {
        handlePlayPause();
    } else if (event.key === "ArrowLeft") {
        changeChannel(-1);
    } else if (event.key === "ArrowRight") {
        changeChannel(1);
    } else if (event.key === "r") {
        randomChannel();
    } else if (event.key === "m") {
        $twitchPlayer?.getMuted()
            ? $twitchPlayer?.setMuted(false)
            : $twitchPlayer?.setMuted(true);
    } else if (event.key === "l") {
        lowPowerMode.set(!$lowPowerMode);
    }
}