import { SECRET_YT_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const videoUrlString = url.searchParams.get('url');
	if (videoUrlString === null) {
		return Response.json(error);
	}

	const videoUrl = new URL(videoUrlString);
	const videoId = videoUrl.searchParams.get('v');

	if (videoId === null) {
		return Response.json(error);
	}

	const ytReq = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${SECRET_YT_API_KEY}&part=snippet&type=video`;

	try {
		const response = await fetch(ytReq);
		const data = await response.json();
		const radio = data.items[0];

		radio.id = {
			kind: 'youtube#video',
			videoId: videoId
		};

		return Response.json({ radio, ok: true });
	} catch (error) {
		console.error('Error fetching video data:', error);
		return Response.json({ ok: false });
	}
};
