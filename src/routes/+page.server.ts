import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/lucia.js";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/login");

    const user = await auth.getUser(session.user.userId);

    return {
        user: user
    };
};