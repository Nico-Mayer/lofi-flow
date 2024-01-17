<script lang="ts">
    import Auth from "$lib/Auth.svelte";

    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        goto("/buddha");
    });
</script>

<main>
    <Auth />
</main>
