<script lang="ts">
    import { PUBLIC_CLIENT_ID } from "$env/static/public";

    function login() {
        const url = new URL("https://id.twitch.tv/oauth2/token");
        const params = {
            client_id: PUBLIC_CLIENT_ID,
            grant_type: `client_credentials`,
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                const { access_token } = data;
                const params = {
                    login: "omie",
                };
                const url = new URL(
                    "https://api.twitch.tv/helix/users?login=" + params.login
                );

                fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Client-Id": PUBLIC_CLIENT_ID,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("data", data);
                    });
            });
    }
</script>

<div>
    <button on:click={login}>Connect with Twitch</button>
</div>
