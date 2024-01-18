// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />
declare global {
	type TV = {
		name: string
		description: string
		channels: Channel[]
	}

	type Channel = {
		title: string
		image: string
		description: string
		url: string
		id: string
	}

	type TwitchPlayer = {
		play: () => void
		pause: () => void
		getVolume: () => number
		setVolume: (volume: number) => void
		getMuted: () => boolean
		setMuted: (muted: boolean) => void
		setChannel: (channel: string) => void
		setQuality: (quality: string) => void
	}

	type VideoData = {
		video_id: string
		author: string
		title: string
		isPlayable: boolean
		errorCode: null | number
		backgroundable: boolean
		cpn: string
		isLive: boolean
		isWindowedLive: boolean
		isManifestless: boolean
		allowLiveDvr: boolean
		isListed: boolean
		isMultiChannelAudio: boolean
		hasProgressBarBoundaries: boolean
		isPremiere: boolean
		progressBarStartPositionUtcTimeMillis: null | number
		progressBarEndPositionUtcTimeMillis: null | number
		paidContentOverlayDurationMs: number
	}

	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			id: string,
			login: string,
			display_name: string,
			description: string,
			profile_image_url: string,
			offline_image_url: string,
			email: string,

		};
		type DatabaseSessionAttributes = {};
	}

	namespace App {
		// interface Error {}
		interface Locals {
			auth: import("lucia").AuthRequest;
			user: Lucia.DatabaseUserAttributes;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { }
