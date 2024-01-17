import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const ssr = false;

export const load = (async () => {
    return redirect(301, `/buddha`)
}) satisfies PageServerLoad;