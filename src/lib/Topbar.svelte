<script lang="ts">
    import { fade } from "svelte/transition";
    import IconBtn from "./IconBtn.svelte";
    import { clickOutside } from "./utils/utils";
    import Auth from "./Auth.svelte";

    let showInfo = false;

    function toggleFullscreen() {
        document.fullscreenElement == null
            ? document.documentElement.requestFullscreen()
            : document.exitFullscreen();
    }

    function toggleInfo(e: MouseEvent) {
        e.stopPropagation();
        showInfo = !showInfo;
    }
</script>

<div
    class="relative flex flex-row justify-between pointer-events-auto items-center"
>
    <div>
        <Auth />
    </div>

    <section class="flex items-center">
        <IconBtn
            icon="mingcute:fullscreen-2-line"
            on:click={toggleFullscreen}
        />
        <IconBtn icon="material-symbols:info-outline" on:click={toggleInfo} />
    </section>

    {#if showInfo}
        <section
            transition:fade={{ duration: 200 }}
            use:clickOutside={() => {
                showInfo = false;
            }}
            class="absolute right-0 text-right top-10"
            id="right"
        >
            <ul>
                <li>
                    <span class="keybind">space </span>
                    <span class="text-glow">play / pause</span>
                </li>
                <li>
                    <span class="keybind">&#8646; </span>
                    <span class="text-glow">switch channel</span>
                </li>
                <li>
                    <span class="keybind">R </span>
                    <span class="text-glow">random channel</span>
                </li>
                <li>
                    <span class="keybind">&#8693; </span>
                    <span class="text-glow">volume</span>
                </li>
                <li>
                    <span class="keybind">M </span>
                    <span class="text-glow">mute</span>
                </li>
                <li>
                    <span class="keybind">L </span>
                    <span class="text-glow">low power mode</span>
                </li>
                <li>
                    <span class="keybind">A </span>
                    <span class="text-glow">add new channel</span>
                </li>
            </ul>
        </section>
    {/if}
</div>

<style>
    .keybind {
        color: #fff;
        filter: drop-shadow(0px 0px 2px #ff0000) drop-shadow(0px 0px 8px red);
    }
</style>
