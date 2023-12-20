import { browser } from '$app/environment'
import { writable } from 'svelte/store'

const defaultRadio: Radio = {
	name: 'Default Radio',
	description: 'The default radio of lofi flow',
	channels: [
		{
			id: 'rPjez8z61rI',
		},
		{
			id: 'J4S8iN7qV1k',
		},
		{
			id: 'jfKfPfyJRdk',
		},
		{
			id: 'bLlloaA4b4g',
		},
		{
			id: 'tyVQk-BAWms',
		},
		{
			id: '-uxi6_5cFqw',
		},
		{
			id: 'wkhLHTmS_GI',
		},
		{
			id: '7p41rWD3s-c',
		},
		{
			id: '0ba7dl40tSQ',
		},
	],
}

export const player = writable<Player | null>(null)
export const videoData = writable<VideoData | null>(null)
export const playing = writable(false)
export const buffering = writable(false)
export const loadError = writable(false)
export const switchingChannel = writable(false)
export const disableChannelSwitching = writable(false)
export const showChannelList = writable(false)
export const lowPowerMode = writable(false)

export const volume = writable(
	browser && localStorage.getItem('volume')
		? parseInt(localStorage?.getItem('volume') as string)
		: 20
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

export const activeChannel = writable(
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
