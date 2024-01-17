import { PUBLIC_CLIENT_ID } from "$env/static/public";
import type { Session, User } from "./auth";

export async function getUser(name: string | null = null, session: Session): Promise<User> {
    return fetch(
        `https://api.twitch.tv/helix/users${name ? `?login=${name}` : ""}`,
        {
            headers: {
                "Client-ID": PUBLIC_CLIENT_ID,
                Authorization: `Bearer ${session.access_token}`,
            },
        }
    )
        .then((res) => res.json())
        .then((res: { data: [User]; }) => {
            return res.data[0];
        });
}