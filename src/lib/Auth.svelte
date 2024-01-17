<script lang="ts">
    import { PUBLIC_CLIENT_ID } from "$env/static/public";
    import { page } from "$app/stores";
    import { browser, dev } from "$app/environment";
    import { session } from "./store/store";
    import { goto } from "$app/navigation";
    import { getUser } from "./utils/twitch";

    const redirectUrl = dev
        ? "http://localhost:5173"
        : "https://lofi-nopixel.com";

    $: $page.url.hash, checkHash();

    function checkHash() {
        if ($page.url.hash == "") return;

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

                getUser(null, $session).then((user) => {
                    $session!.user = user;
                    goto("/");
                });
            }
        }
    }
</script>

{#if $session && $session.access_token && $session.user}
    <div class="flex flex-col justify-center items-center">
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
        href="https://id.twitch.tv/oauth2/authorize?client_id={PUBLIC_CLIENT_ID}&redirect_uri={redirectUrl}&response_type=token&scope=channel:read:subscriptions"
        class="block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
        Login with Twitch
    </a>
{/if}
