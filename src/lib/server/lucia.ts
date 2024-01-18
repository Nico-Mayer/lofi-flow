import { dev } from "$app/environment";
import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { twitch } from "@lucia-auth/oauth/providers";
import { POSTGRES_URL, TWITCH_CLIENT_SECRET, TWITCH_REDIRECT_URI } from "$env/static/private";
import { createPool } from '@vercel/postgres';
import { PUBLIC_TWITCH_CLIENT_ID } from "$env/static/public";

export const pool = createPool({
    connectionString: POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export const auth = lucia({
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    adapter: pg(pool, {
        user: "auth_user",
        key: "user_key",
        session: "user_session"
    }),
    getUserAttributes: (dbUser) => {
        return {
            id: dbUser.id,
            login: dbUser.login,
            display_name: dbUser.display_name,
            description: dbUser.description,
            profile_image_url: dbUser.profile_image_url,
            offline_image_url: dbUser.offline_image_url,
            email: dbUser.email
        };
    },
    getSessionAttributes: (session) => {
        return {
            token: session.token
        };
    }
});

export const twitchProvider = twitch(auth, {
    clientId: PUBLIC_TWITCH_CLIENT_ID,
    clientSecret: TWITCH_CLIENT_SECRET,
    redirectUri: TWITCH_REDIRECT_URI
});

export type Auth = typeof auth;