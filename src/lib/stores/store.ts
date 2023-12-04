import { browser } from '$app/environment'
import { writable } from 'svelte/store'

const defaultRadio: Radio = {
	name: 'Default Radio',
	description: 'The default radio of lofi flow',
	channels: [
		{
			name: 'WoW Lofi Beats To Chill To | Waiting for BlizzCon',
			id: '-uxi6_5cFqw',
		},
		{
			name: 'Shadowlands Lo-Fi Remixes: 4-Hour Compilation',
			id: 'UWrslj9JQnc',
		},
		{
			name: 'lofi hip hop radio 📚 - beats to relax/study to',
			id: 'jfKfPfyJRdk',
		},
		{
			name: '【Ｓｍｏｋｅ　Ａｎｄ　Ｃｈｉｌｌ】 ~ Lofi Hip Hop | Relaxing Music [ Beats To Relax / Chill To ]',
			id: 'J4S8iN7qV1k',
		},
		{
			name: 'Autumn Chill 🍂 Refresh Your Mind 🍂 24/7 Lofi hiphop',
			id: 'AzwgsZUcTfM',
		},
		{
			name: 'lofi hip hop radio 😴 sad & sleepy beats',
			id: 'bLlloaA4b4g',
		},
		{
			name: 'ＣＨＩＬＬ　ＲＡＤＩＯ ２４／７',
			id: 'tyVQk-BAWms',
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

volume.subscribe((value) => {
	if (browser) {
		localStorage.setItem('volume', value.toString())
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
