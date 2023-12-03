import { browser } from '$app/environment'
import { writable } from 'svelte/store'

const defaultRadio: Radio = {
	name: 'Awesome Radio',
	description: 'The best radio station on the web!',
	channels: [
		{
			name: 'Hito Lofi',
			url: 'https://www.youtube.com/watch?v=th8sZnMm9Nw',
			id: 'th8sZnMm9Nw',
			description: 'The hottest hits 24/7',
			socials: [
				{ name: 'Facebook', url: 'https://facebook.com/channel1' },
				{ name: 'Twitter', url: 'https://twitter.com/channel1' },
			],
		},
		{
			name: 'WoW Lofi Beats',
			url: 'https://www.youtube.com/watch?v=-uxi6_5cFqw',
			id: '-uxi6_5cFqw',
			description: 'Classic rock and roll all day long',
			socials: [
				{
					name: 'Instagram',
					url: 'https://instagram.com/channel2',
				},
				{ name: 'YouTube', url: 'https://youtube.com/channel2' },
			],
		},
		{
			name: 'Smoke and Chill',
			url: 'https://www.youtube.com/watch?v=J4S8iN7qV1k',
			id: 'J4S8iN7qV1k',
			description: 'Chill vibes for a relaxing day',
			socials: [
				{
					name: 'Pinterest',
					url: 'https://pinterest.com/channel10',
				},
				{ name: 'LinkedIn', url: 'https://linkedin.com/channel10' },
			],
		},
		{
			name: 'lofi hip hop radio',
			url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
			id: '5qap5aO4i9A',
			description: 'Chill vibes for a relaxing day',
			socials: [
				{
					name: 'Pinterest',
					url: 'https://pinterest.com/channel10',
				},
				{ name: 'LinkedIn', url: 'https://linkedin.com/channel10' },
			],
		},
		{
			name: 'Bootleg Boy',
			url: 'https://www.youtube.com/watch?v=bLlloaA4b4g',
			id: 'bLlloaA4b4g',
			description: 'Chill vibes for a relaxing day',
			socials: [
				{
					name: 'Pinterest',
					url: 'https://pinterest.com/channel10',
				},
				{ name: 'LinkedIn', url: 'https://linkedin.com/channel10' },
			],
		},
	],
}

export const volume = writable(
	browser && localStorage.getItem('volume')
		? parseInt(localStorage?.getItem('volume') as string)
		: 10
)
export const radio = writable(
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
