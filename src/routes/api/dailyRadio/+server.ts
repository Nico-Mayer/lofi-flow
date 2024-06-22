import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const res = {
		date: '2021-09-02',
		radios: ['wkhLHTmS_GI', 'rPjez8z61rI', 'J4S8iN7qV1k', 'jfKfPfyJRdk']
	};

	return json(res);
};
