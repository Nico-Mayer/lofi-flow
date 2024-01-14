<script lang="ts">
    import { page } from "$app/stores";
    import { PUBLIC_CLIENT_ID } from "$env/static/public";
    import { onMount } from "svelte";

    const authToken = $page.url.hash.split("=")[1];

    async function handleAuth() {
        console.log("authToken", authToken);

        const url = new URL("https://id.twitch.tv/oauth2/validate");
        const params = {
            client_id: PUBLIC_CLIENT_ID,
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:5173",
            code: authToken,
        };

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
        });

        console.log("res", res);
    }

    onMount(() => {
        handleAuth();
    });
</script>

<div>Welcome to the Twitch auth page! {authToken}</div>
