import { dev } from "$app/environment";
import { twitchProvider } from "$lib/server/lucia.js";

export const GET = async ({ cookies }) => {
    const [url, state] = await twitchProvider.getAuthorizationUrl();
    // store state
    cookies.set("twitch_oauth_state", state, {
        httpOnly: true,
        secure: !dev,
        path: "/",
        maxAge: 60 * 60
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString()
        }
    });
};