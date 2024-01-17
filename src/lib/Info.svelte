<script lang="ts">
    import { fade } from "svelte/transition";
</script>

<section
    transition:fade={{ duration: 200 }}
    class="absolute right-0 text-right top-6 border-2 animate-glow border-green-300 p-4"
>
    <ul class="text-5xl">
        <li>
            <span class="keybind">space </span>
            <span class="text-glow">play / pause</span>
        </li>
        <li>
            <span class="keybind">C </span>
            <span class="text-glow">channel list</span>
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
    </ul>
</section>

<style>
    .keybind {
        color: #fff;
        filter: drop-shadow(0px 0px 2px #ff0000) drop-shadow(0px 0px 8px red);
    }
</style>
