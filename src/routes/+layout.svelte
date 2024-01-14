<script lang="ts">
    import "../app.css";
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";

    inject({ mode: dev ? "development" : "production" });

    const description =
        "Lofi NoPixel is like your cozy corner on the web to chill with while watching your favorite streamers. No chat, No spam. 🎶✨";

    const title = "Lofi NoPixel.";
    const url = "https://lofi-nopixel.com/";
    const image_preview = url + "/preview-small.jpg";
</script>

<svelte:head>
    <title>Lofi NoPixel.</title>

    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={image_preview} />

    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image_preview} />
</svelte:head>

<slot />
