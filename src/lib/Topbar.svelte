<script lang="ts">
    import IconBtn from "./IconBtn.svelte";
    import Auth from "./Auth.svelte";
    import { onboarded } from "./store/store";
    import Info from "./Info.svelte";
    import { clickOutside } from "./utils/utils";

    let showInfo = $onboarded ? $onboarded : false;

    function toggleFullscreen() {
        document.fullscreenElement == null
            ? document.documentElement.requestFullscreen()
            : document.exitFullscreen();
    }

    function toggleInfo(e: MouseEvent) {
        if (!$onboarded) onboarded.set(true);
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
        <div
            use:clickOutside={() => {
                showInfo = false;
                if (!$onboarded) onboarded.set(true);
            }}
            class="absolute w-full"
        >
            <Info />
        </div>
    {/if}
</div>
