<script lang="ts">
    import {
        activeChannel,
        radio,
        showChannelList,
        switchingChannel,
    } from "$lib/store/store";
    import { rnd } from "$lib/utils/utils";
    import { fade } from "svelte/transition";
    import IconBtn from "./IconBtn.svelte";
    import IconLink from "./IconLink.svelte";
    import { clickOutside } from "./utils/utils";
    import { track } from "@vercel/analytics";

    let channels: Channel[] = $radio.channels;

    function handleChannelChange(channel: Channel) {
        $activeChannel = channel;
        $showChannelList = false;
        $switchingChannel = true;
        setTimeout(
            () => {
                $switchingChannel = false;
            },
            rnd(220, 310)
        );
    }

    function removeChannel(event: MouseEvent, id: string) {
        track("Channel removed");
        event.stopPropagation();
        let newRadio = $radio;
        newRadio.channels = newRadio.channels.filter(
            (channel) => channel.id !== id
        );
        $radio = newRadio;
        channels = $radio.channels;
    }
</script>

<main
    transition:fade={{ duration: 400 }}
    class="absolute top-0 left-0 z-30 w-full h-full overflow-auto bg-black/50"
>
    <div
        class="channel-grid p-16"
        use:clickOutside={() => {
            $showChannelList = false;
        }}
    >
        {#each channels as channel}
            <div class="relative w-full max-w-full p-4 m-auto group">
                <IconLink
                    class="absolute top-6 right-6"
                    url={channel.url}
                    icon="pixelarticons:external-link"
                />

                <IconBtn
                    class="absolute !hidden top-6 left-6 group-hover:!block"
                    on:click={(e) => removeChannel(e, channel.id)}
                    icon="pixelarticons:close"
                />

                <button
                    class:active={$activeChannel.id === channel.id}
                    class="w-full h-full channel-item"
                    on:click={() => handleChannelChange(channel)}
                >
                    <img
                        draggable="false"
                        class="object-cover w-full h-full max-h-96"
                        src={channel.image}
                        alt="channel-thumbnail"
                    />
                    <div class="p-2 bg-white">
                        <!-- Your content goes here -->
                        <p class="text-lg font-semibold truncate text-ellipsis">
                            {channel.title}
                        </p>
                    </div>
                </button>
            </div>
        {/each}
    </div>
</main>

<style scoped>
    .channel-item:hover {
        @apply shadow-md animate-glow;
    }
    .channel-grid {
        @apply grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4;
    }
    .active {
        @apply border-2 animate-glow border-green-300;
    }
</style>
