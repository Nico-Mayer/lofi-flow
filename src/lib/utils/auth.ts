export type Session = {
    "access_token": string,
    "token_type": string,
    "user": User | null
}

export type User = {
    "id": string,
    "login": string,
    "display_name": string,
    "type": string,
    "broadcaster_type": string,
    "description": string,
    "profile_image_url": string,
    "offline_image_url": string,
    "view_count": number,
    "email": string,
    "created_at": string
}
