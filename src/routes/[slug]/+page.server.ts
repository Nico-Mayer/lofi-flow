import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/login");

    return {
        user: session.user,
        access_token: session.token,
        channel: params.slug
    }
};