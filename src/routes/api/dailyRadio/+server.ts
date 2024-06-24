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
	},
	{
		kind: 'youtube#searchResult',
		etag: 'LX3MGxAFhHHrQH9L7G4kgHt2j1k',
		id: {
			kind: 'youtube#video',
			videoId: 'WLzqIuk5684'
		},
		snippet: {
			publishedAt: '2024-06-23T21:16:36Z',
			channelId: 'UCDFm-w2mWNAPy6sqAPcKnkQ',
			title:
				'Monday Vibes 🍀💖 Calm Your Mind ~ Lofi hip hop mix - Lofi music for sleep/study/relax/aesthetic',
			description:
				'Monday Vibes Calm Your Mind ~ Lofi hip hop mix - Lofi music for sleep/study/relax/aesthetic ...',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/WLzqIuk5684/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/WLzqIuk5684/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/WLzqIuk5684/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'RELAXATION (LoFi & CHILL)',
			liveBroadcastContent: 'live',
			publishTime: '2024-06-23T21:16:36Z'
		}
	},
	{
		kind: 'youtube#searchResult',
		etag: 'NCEuqqnFC8m1RYPoIieQd_RF7fY',
		id: {
			kind: 'youtube#video',
			videoId: '5yx6BWlEVcY'
		},
		snippet: {
			publishedAt: '2020-03-21T13:21:02Z',
			channelId: 'UCOxqgCwgOqC2lMqC5PYz_Dg',
			title: 'Chillhop Radio - jazzy &amp; lofi hip hop beats 🐾',
			description:
				'Add Chillhop Essentials Summer 2024 to your music library & unlock Freebies ・ https://chillhop.ffm.to/summer2024.OYD!',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/5yx6BWlEVcY/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/5yx6BWlEVcY/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/5yx6BWlEVcY/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'Chillhop Music',
			liveBroadcastContent: 'live',
			publishTime: '2020-03-21T13:21:02Z'
		}
	},
	{
		kind: 'youtube#searchResult',
		etag: 'y6aYj9VNW3wGtD-ALYYTvkRQ9eA',
		id: {
			kind: 'youtube#video',
			videoId: 'Na0w3Mz46GA'
		},
		snippet: {
			publishedAt: '2024-06-02T16:19:22Z',
			channelId: 'UCSJ4gkVC6NrvII8umztf0Ow',
			title: 'asian lofi radio ⛩️ - beats to relax/study to',
			description:
				'Listen on Spotify, Apple music and more → https://fanlink.tv/asian-lofi | Lofi Girl on all social media ...',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/Na0w3Mz46GA/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/Na0w3Mz46GA/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/Na0w3Mz46GA/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'Lofi Girl',
			liveBroadcastContent: 'live',
			publishTime: '2024-06-02T16:19:22Z'
		}
	},
	{
		kind: 'youtube#searchResult',
		etag: 'shUW8BToHsLKSjQuqfGagYcf3Wo',
		id: {
			kind: 'youtube#video',
			videoId: '7NOSDKb0HlU'
		},
		snippet: {
			publishedAt: '2020-03-21T13:58:03Z',
			channelId: 'UCOxqgCwgOqC2lMqC5PYz_Dg',
			title: 'lofi hip hop radio - beats to study/relax to 🐾',
			description:
				'Add Chillhop Essentials Summer 2024 to your music library & unlock Freebies ・ https://chillhop.ffm.to/summer2024.OYD!lofiradio ...',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/7NOSDKb0HlU/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/7NOSDKb0HlU/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/7NOSDKb0HlU/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'Chillhop Music',
			liveBroadcastContent: 'live',
			publishTime: '2020-03-21T13:58:03Z'
		}
	},
	{
		kind: 'youtube#searchResult',
		etag: 'USwR6L4zMOvVrFm2mGy3ESWX3x8',
		id: {
			kind: 'youtube#video',
			videoId: 'lP26UCnoH9s'
		},
		snippet: {
			publishedAt: '2023-06-02T13:53:24Z',
			channelId: 'UCsIg9WMfxjZZvwROleiVsQg',
			title: 'Coffee Shop Radio ☕ - 24/7 lofi &amp; jazzy hip-hop beats',
			description:
				"Coffee Shop Vibes on Spotify: https://listen.to/coffeeshop This stream's playlist is curated with an emphasis on meditation and ...",
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/lP26UCnoH9s/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/lP26UCnoH9s/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/lP26UCnoH9s/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'STEEZYASFUCK',
			liveBroadcastContent: 'live',
			publishTime: '2023-06-02T13:53:24Z'
		}
	},
	{
		kind: 'youtube#searchResult',
		etag: 'euJHhkjlcMSGe-0MhZi0W60yKJE',
		id: {
			kind: 'youtube#video',
			videoId: '4xDzrJKXOOY'
		},
		snippet: {
			publishedAt: '2023-07-02T21:17:31Z',
			channelId: 'UCSJ4gkVC6NrvII8umztf0Ow',
			title: 'synthwave radio 🌌 - beats to chill/game to',
			description:
				'Listen on Spotify, Apple music and more → https://fanlink.tv/ChillSynthwave | Subscribe to this channel for more synthwave ...',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/4xDzrJKXOOY/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/4xDzrJKXOOY/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/4xDzrJKXOOY/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'Lofi Girl',
			liveBroadcastContent: 'live',
			publishTime: '2023-07-02T21:17:31Z'
		}
	},
	{
		kind: 'youtube#searchResult',
		etag: '24KmoEWiIy56LSG1a6XH1ZEWoL4',
		id: {
			kind: 'youtube#video',
			videoId: 'J4O59g3vnWg'
		},
		snippet: {
			publishedAt: '2024-06-15T09:02:20Z',
			channelId: 'UCDFm-w2mWNAPy6sqAPcKnkQ',
			title: 'High energy Lofi Hip Hop rhythms 🏋️‍♂️ for studying, working and relaxing',
			description:
				'High energy Lofi Hip Hop rhythms 🏋️‍♂️ for studying, working and relaxing https://youtube.com/live/J4O59g3vnWg ...',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/J4O59g3vnWg/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/J4O59g3vnWg/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/J4O59g3vnWg/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'RELAXATION (LoFi & CHILL)',
			liveBroadcastContent: 'live',
			publishTime: '2024-06-15T09:02:20Z'
		}
	},
	{
		kind: 'youtube#searchResult',
		etag: '-IiNxp1T4gZxSGiLhHBGU5ioegA',
		id: {
			kind: 'youtube#video',
			videoId: 'apCom1TeTiA'
		},
		snippet: {
			publishedAt: '2023-06-05T15:48:32Z',
			channelId: 'UC7tdoGx0eQfRJm9Qj6GCs0A',
			title: 'lofi hip hop radio - beats to study/chill/relax',
			description:
				'all of your favourite lofi & chillout music all day. every day! perfect for background music at work, during studying, gaming or simply ...',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/apCom1TeTiA/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/apCom1TeTiA/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/apCom1TeTiA/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'nourish.',
			liveBroadcastContent: 'live',
			publishTime: '2023-06-05T15:48:32Z'
		}
	},
	{
		kind: 'youtube#searchResult',
		etag: 'VN4Ow063v1EkTQun06jG22RC4IA',
		id: {
			kind: 'youtube#video',
			videoId: 'knrPS5sqOvU'
		},
		snippet: {
			publishedAt: '2024-06-22T22:28:25Z',
			channelId: 'UCDFm-w2mWNAPy6sqAPcKnkQ',
			title: 'Summer Lofi Hip Hop Mix 💖🍀📚 for Studying and Working',
			description:
				'Summer Lofi Hip Hop Mix for Studying and Working https://youtube.com/live/knrPS5sqOvU ...',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/knrPS5sqOvU/default_live.jpg',
					width: 120,
					height: 90
				},
				medium: {
					url: 'https://i.ytimg.com/vi/knrPS5sqOvU/mqdefault_live.jpg',
					width: 320,
					height: 180
				},
				high: {
					url: 'https://i.ytimg.com/vi/knrPS5sqOvU/hqdefault_live.jpg',
					width: 480,
					height: 360
				}
			},
			channelTitle: 'RELAXATION (LoFi & CHILL)',
			liveBroadcastContent: 'live',
			publishTime: '2024-06-22T22:28:25Z'
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
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string;
const MAX_RESULTS = 10;

let cashedRadios: Radio[] = [];
let lastUpdate: number | null = null;

function getCategory() {
	return LOFI_CATEGORIES[Math.floor(Math.random() * LOFI_CATEGORIES.length)];
}

export const GET: RequestHandler = async () => {
	const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&q=${getCategory()}&maxResults=${MAX_RESULTS}&key=${API_KEY}`;

	if (lastUpdate === null || lastUpdate + 1000 * 60 * 60 * 12 < Date.now()) {
		lastUpdate = Date.now();
		try {
			const response = await fetch(URL);
			const data = await response.json();
			const radios: Radio[] = data.items;
			cashedRadios = radios;
			return Response.json(cashedRadios);
		} catch (error) {
			cashedRadios = BACKUP_RADIO;
			console.error('Error fetching radios:', error);
			console.log('Using backup radios');
			return Response.json(cashedRadios);
		}
	} else {
		return Response.json(cashedRadios);
	}
};
