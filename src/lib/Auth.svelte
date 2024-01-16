<script lang="ts">
    import { PUBLIC_CLIENT_ID } from "$env/static/public";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { session } from "./store/store";
    import type { User } from "./utils/auth";

    function getUser(name: string | null = null) {
        if (!$session) return;
        fetch(
            `https://api.twitch.tv/helix/users${name ? `?login=${name}` : ""}`,
            {
                headers: {
                    "Client-ID": PUBLIC_CLIENT_ID,
                    Authorization: `Bearer ${$session.access_token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((res: { data: [User] }) => {
                if (res.data[0]) {
                    session.update((s) => {
                        if (!s) return s;
                        s.user = res.data[0];
                        return s;
                    });
                }
            });
    }

    function validate() {}

    onMount(() => {
        const params = $page.url.hash
            .slice(1)
            .split("&")
            .reduce(
                (prev, curr) => {
                    const [key, value] = curr.split("=");
                    prev[key] = value;
                    return prev;
                },
                {} as Record<string, string>
            );

        if (params["access_token"]) {
            const accessToken = params["access_token"];
            const tokenType = params["token_type"];

            if (browser) {
                $session = {
                    access_token: accessToken,
                    token_type: tokenType,
                    user: null,
                };
            }

            getUser();
        }
    });
</script>

<div>
    {#if $session && $session.access_token && $session.user}
        <div>
            <img
                src={$session.user.profile_image_url}
                alt="User Profile"
                width="50"
                height="50"
                class="rounded-full"
            />
            <span class="text-slate-100 font-semibold">
                {$session.user.display_name}
            </span>
        </div>
    {:else}
        <a
            href="https://id.twitch.tv/oauth2/authorize?client_id={PUBLIC_CLIENT_ID}&redirect_uri=http://localhost:5173&response_type=token&scope=channel:read:subscriptions"
        >
            Connect with Twitch
            <img
                src="https://static-cdn.jtvnw.net/jtv_user_pictures/0f9f9f9f-0f9f-0f9f-0f9f-0f9f9f9f0f9f-profile_image-300x300.png"
                alt="Twitch Logo"
                width="50"
                height="50"
                class="rounded-full"
            />
        </a>
    {/if}
</div>
