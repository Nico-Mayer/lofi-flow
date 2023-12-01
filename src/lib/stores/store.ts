import { browser } from '$app/environment'
import { writable } from 'svelte/store'

export const volume = writable(
	browser && localStorage.getItem('volume')
		? parseInt(localStorage?.getItem('volume') as string)
		: 10
)

volume.subscribe((value) => {
	if (browser) {
		localStorage.setItem('volume', value.toString())
	}
})
