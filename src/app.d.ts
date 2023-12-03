// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	type Radio = {
		name: string
		description: string
		channels: Channel[]
	}

	type Channel = {
		name: string
		url: string
		id: string
		description: string
		socials: Social[]
	}

	type Social = {
		name: string
		url: string
	}

	type Player = {
		playVideo: () => void
		pauseVideo: () => void
		loadVideoById: (id: string) => void
		setVolume: (volume: number) => void
		isMuted: () => boolean
		mute: () => void
		unMute: () => void
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
