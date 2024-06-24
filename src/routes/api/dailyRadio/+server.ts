import type { RequestHandler } from './$types';

const BACKUP_RADIO = [
	{
		kind: 'youtube#searchResult',
		etag: 'VWvBgFgyhuTyJk7x76h6fIkKVRU',
		id: {
			kind: 'youtube#video',
			videoId: 'jfKfPfyJRdk'
		},
		snippet: {
			publishedAt: '2022-07-12T12:12:29Z',
			channelId: 'UCSJ4gkVC6NrvII8umztf0Ow',
			title: 'lofi hip hop radio 📚 - beats to relax/study to',
			description:
				'Listen on Spotify, Apple music and more → https://fanlink.tv/lofigirl-music | Lofi Girl on all social media ...',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/jfKfPfyJRdk/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/jfKfPfyJRdk/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'Lofi Girl',
			liveBroadcastContent: 'live',
			publishTime: '2022-07-12T12:12:29Z'
		}
	}
];

const LOFI_CATEGORIES = [
	'Chillhop',
	'Jazzhop',
	'LoFi Beats',
	'LoFi Hip Hop',
	'LoFi Jazz',
	'LoFi Study',
	'LoFi Relax',
	'LoFi Chill',
	'LoFi Sleep',
	'LoFi Focus',
	'LoFi Piano',
	'LoFi Guitar',
	'LoFi Vinyl',
	'LoFi Ambient',
	'LoFi Rain',
	'LoFi Night',
	'LoFi Morning',
	'LoFi Coffee Shop',
	'LoFi Nature',
	'LoFi City',
	'LoFi Dream',
	'LoFi Nostalgia',
	'LoFi Vaporwave',
	'LoFi Synthwave',
	'LoFi Trip-Hop',
	'LoFi Lounge',
	'LoFi Acoustic',
	'LoFi Classic',
	'LoFi Blues',
	'LoFi Funk',
	'LoFi Soul',
	'LoFi Grooves',
	'LoFi Chillstep',
	'LoFi Downtempo',
	'LoFi Psychedelic',
	'LoFi Dub',
	'LoFi Fusion',
	'LoFi Experimental',
	'LoFi Electronic',
	'LoFi World',
	'LoFi Meditative',
	'LoFi Space',
	'LoFi Melancholy',
	'LoFi Uplifting',
	'LoFi Chillwave',
	'LoFi Bass',
	'LoFi Strings',
	'LoFi Loops',
	'LoFi Vocals'
];

const API_KEY = 'AIzaSyC_RbYtFDv12jK80gWr1RACkotITYssMZo';
const MAX_RESULTS = 10;

function getCategory() {
	return LOFI_CATEGORIES[Math.floor(Math.random() * LOFI_CATEGORIES.length)];
}

export const GET: RequestHandler = async () => {
	const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&q=${getCategory()}&maxResults=${MAX_RESULTS}&key=${API_KEY}`;

	try {
		const response = await fetch(URL);
		const data = await response.json();
		console.log(data);

		const videos: Radio[] = data.items;

		return Response.json(videos);
	} catch (error) {
		console.error(error);
		return Response.json(BACKUP_RADIO);
	}
};
