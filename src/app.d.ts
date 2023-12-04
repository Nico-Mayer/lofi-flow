// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	type Radio = {
		name: string
		description: string
		channels: Channel[]
	}

	type Channel = {
		id: string
	}

	type Player = {
		playVideo: () => void
		pauseVideo: () => void
		loadVideoById: (id: string) => void
		getVideoData: () => VideoData
		setVolume: (volume: number) => void
		isMuted: () => boolean
		mute: () => void
		unMute: () => void
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

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
