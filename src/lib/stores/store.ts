import { browser } from '$app/environment'
import { writable } from 'svelte/store'

const defaultRadio: Radio = {
	name: 'Default Radio',
	description: 'The default radio of lofi flow',
	channels: [
		{
			id: 'J4S8iN7qV1k',
		},
		{
			id: 'AzwgsZUcTfM',
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
			id: 'UWrslj9JQnc',
		},
	],
}

export const volume = writable(
	browser && localStorage.getItem('volume')
		? parseInt(localStorage?.getItem('volume') as string)
		: 10
)
export const radio = writable<Radio>(
	browser && localStorage.getItem('radio')
		? JSON.parse(localStorage?.getItem('radio') as string)
		: defaultRadio
)
export const activeChannel = writable(
	browser && localStorage.getItem('activeChannel')
		? JSON.parse(localStorage?.getItem('activeChannel') as string)
		: defaultRadio.channels[0]
)

export const playing = writable(false)
export const buffering = writable(false)
export const loadError = writable(false)
export const switchingChannel = writable(false)

volume.subscribe((value) => {
	if (browser) {
		let volume = ''

		if (value > 100) {
			volume = '100'
		} else if (value < 0) {
			volume = '0'
		} else if (value == null || value == undefined) {
			return
		}

		localStorage.setItem('volume', volume)
	}
})
radio.subscribe((value) => {
	if (browser) {
		localStorage.setItem('radio', JSON.stringify(value))
	}
})
activeChannel.subscribe((value) => {
	if (browser) {
		localStorage.setItem('activeChannel', JSON.stringify(value))
	}
})
