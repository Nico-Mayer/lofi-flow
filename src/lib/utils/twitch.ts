import { PUBLIC_TWITCH_CLIENT_ID } from "$env/static/public";
import type { User } from "./auth";

export async function getUser(name: string | null = null, token: string): Promise<User> {
    return fetch(
        `https://api.twitch.tv/helix/users${name ? `?login=${name}` : ""}`,
        {
            headers: {
                "Client-ID": PUBLIC_TWITCH_CLIENT_ID,
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((res) => res.json())
        .then((res: { data: [User]; }) => {
            return res.data[0];
        });
}