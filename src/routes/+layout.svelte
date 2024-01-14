<script lang="ts">
    import "../app.css";
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";

    inject({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
    <title>lofi nopixel.</title>

    <meta
        name="description"
        content="Save your best-loved YouTube lofi live radios and videos in one spot."
    />
    <meta property="og:title" content="lofi flow." />
    <meta
        property="og:description"
        content="Save your best-loved YouTube lofi live radios and videos in one spot."
    />
    <meta property="og:url" content="https://lofi-flow.vercel.app/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/preview.png" />

    <meta name="twitter:title" content="lofi flow." />
    <meta
        name="twitter:description"
        content="Save your best-loved YouTube lofi live radios and videos in one spot."
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="/preview.png" />
</svelte:head>

<slot />
