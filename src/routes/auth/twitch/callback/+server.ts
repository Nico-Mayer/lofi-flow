import { auth, twitchProvider } from "$lib/server/lucia.js";
import { OAuthRequestError } from "@lucia-auth/oauth";

export const GET = async ({ url, cookies, locals }) => {
    const storedState = cookies.get("twitch_oauth_state");
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");

    // validate state
    if (!storedState || !state || storedState !== state || !code) {
        return new Response(null, {
            status: 400
        });
    }
    try {
        const { getExistingUser, twitchUser, createUser, twitchTokens } =
            await twitchProvider.validateCallback(code);

        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser) return existingUser;
            const user = await createUser({
                attributes: {
                    id: twitchUser.id,
                    login: twitchUser.login,
                    display_name: twitchUser.display_name,
                    description: twitchUser.description,
                    profile_image_url: twitchUser.profile_image_url,
                    offline_image_url: twitchUser.offline_image_url,
                    email: twitchUser.email ?? "",
                }
            });
            return user;
        };

        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {
                token: twitchTokens.accessToken
            }
        });
        locals.auth.setSession(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        if (e instanceof OAuthRequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
};