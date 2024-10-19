// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	type VideoData = {
		video_id: string;
		author: string;
		title: string;
		isPlayable: boolean;
		errorCode: null | number;
		backgroundable: boolean;
		cpn: string;
		isLive: boolean;
		isWindowedLive: boolean;
		isManifestless: boolean;
		allowLiveDvr: boolean;
		isListed: boolean;
		isMultiChannelAudio: boolean;
		hasProgressBarBoundaries: boolean;
		isPremiere: boolean;
		progressBarStartPositionUtcTimeMillis: null | number;
		progressBarEndPositionUtcTimeMillis: null | number;
		paidContentOverlayDurationMs: number;
	};

	interface Player extends YT.Player {
		getVideoData(): VideoData;
	}

	interface Radio {
		kind: string;
		etag: string;
		id: {
			kind: string;
			videoId: string;
		};
		snippet: {
			publishedAt: string;
			channelId: string;
			title: string;
			description: string;
			thumbnails: {
				default: {
					url: string;
					width: number;
					height: number;
				};
				medium: {
					url: string;
					width: number;
					height: number;
				};
				high: {
					url: string;
					width: number;
					height: number;
				};
			};
			channelTitle: string;
			liveBroadcastContent: string;
			publishTime: string;
		};
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
