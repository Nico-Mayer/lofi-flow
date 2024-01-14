import { browser } from '$app/environment'
import { writable } from 'svelte/store'

const defaultRadio: Radio = {
	name: 'Default Radio',
	description: 'The default radio of lofi nopixel',
	channels: [
		{
			id: 'omie',
			title: 'Omie',
			description: 'Marty Banks is a streamer on nopixel. He plays a character named Marty Banks.',
			image: "https://static-cdn.jtvnw.net/jtv_user_pictures/052abaf5-0f8f-49c7-8c43-000e9fc08ab0-profile_image-300x300.png",
			url: 'https://www.twitch.tv/omie'
		},
		{
			id: 'moonmoon',
			title: 'Moonmoon',
			description: 'Moonmoon is a streamer on nopixel. He plays a character.',
			image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3973e918fe7cc8c8-profile_image-300x300.png',
			url: 'https://www.twitch.tv/moonmoon'
		},
		{
			id: 'jack',
			title: 'Jack',
			description: 'Jack is a streamer on nopixel. He plays a character named Jack Cortair.',
			image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/91bf83a1-bb13-46ba-9289-43af7a4d7592-profile_image-300x300.png',
			url: 'https://www.twitch.tv/jack'
		},
		{
			id: '4head',
			title: '4Head',
			description: '4Head is a streamer on nopixel. He plays a character named 4Head.',
			image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4315ed51-808d-4174-ae38-5f5872177aff-profile_image-300x300.png',
			url: 'https://www.twitch.tv/4head'
		},
		{
			id: 'ripoozi',
			title: 'Ripoozi',
			description: 'Larry Knox is a streamer on nopixel. He plays a character named Larry Knox.',
			image: "https://static-cdn.jtvnw.net/jtv_user_pictures/26c9b874-6d9b-40af-9c7d-c60818b445cd-profile_image-300x300.png",
			url: 'https://www.twitch.tv/ripoozi'
		},
		{
			id: 'thatguygp',
			title: 'ThatGuyGP',
			description: 'ThatGuyGP is a streamer on nopixel. He plays a character named Jamal.',
			image: "https://static-cdn.jtvnw.net/jtv_user_pictures/7b14faef-c35a-4d96-9586-94670372b826-profile_image-300x300.png",
			url: 'https://www.twitch.tv/thatguygp'
		},
		{
			id: 'Ming',
			title: 'Ming',
			description: 'Ming is a streamer on nopixel. He plays a character named Ming Jingtai.',
			image: "https://static-cdn.jtvnw.net/jtv_user_pictures/c2b6654a-a470-4625-9f43-df0d8f2bf0ed-profile_image-300x300.png",
			url: 'https://www.twitch.tv/ming'
		}
	],
}

export const twitchPlayer = writable<TwitchPlayer | null>(null)
export const videoData = writable<VideoData | null>(null)
export const playing = writable(false)
export const offline = writable(false)
export const buffering = writable(false)
export const loadError = writable(false)
export const switchingChannel = writable(false)
export const disableChannelSwitching = writable(false)
export const showChannelList = writable(false)
export const lowPowerMode = writable(false)

export const volume = writable(
	browser && localStorage.getItem('volume')
		? parseFloat(localStorage?.getItem('volume') as string)
		: 0.2
)
volume.subscribe((value) => {
	if (browser) {
		if (value == null || value == undefined) {
			return
		}

		let volume = value.toString()

		if (value > 100) {
			volume = '100'
		} else if (value < 0) {
			volume = '0'
		}


		localStorage.setItem('volume', volume)
	}
})

export const activeChannel = writable<Channel>(
	browser && localStorage.getItem('activeChannel')
		? JSON.parse(localStorage?.getItem('activeChannel') as string)
		: defaultRadio.channels[0]
)
activeChannel.subscribe((value) => {
	if (browser) {
		localStorage.setItem('activeChannel', JSON.stringify(value))
	}
})

export const radio = writable<Radio>(
	browser && localStorage.getItem('radio')
		? JSON.parse(localStorage?.getItem('radio') as string)
		: defaultRadio
)
radio.subscribe((newRadio) => {
	if (browser) {
		if (newRadio.channels.length == 0) {
			newRadio.channels = defaultRadio.channels
		}

		localStorage.setItem('radio', JSON.stringify(newRadio))
	}
})
