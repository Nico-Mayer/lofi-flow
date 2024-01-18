<script lang="ts">
    import { page } from "$app/stores";
</script>

{#if $page.data.user}
    <div class="flex flex-col justify-center items-center">
        <img
            src={$page.data.user.profile_image_url}
            alt="User Profile"
            width="50"
            height="50"
            class="rounded-full"
        />
        <span class="text-slate-100 font-semibold">
            {$page.data.user.display_name}
        </span>
    </div>
{:else}
    <a
        href="/auth/twitch"
        class="block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
        Login with Twitch
    </a>
{/if}
