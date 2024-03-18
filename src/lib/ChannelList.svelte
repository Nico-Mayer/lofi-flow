<script lang="ts">
	import {
		activeChannel,
		radio,
		showChannelList,
		switchingChannel,
	} from '$lib/store/store'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import ChannelItem from './ChannelItem.svelte'
	import { clickOutside } from './utils/utils'

	let channels: Channel[] = []

	onMount(() => {
		channels = $radio.channels

		for (let i = 0; i < channels.length; i++) {
			if (channels[i].title) continue

			getTitle(channels[i].id).then((title) => {
				channels[i].title = title
			})
		}

		$radio.channels = channels
	})

	async function getTitle(id: string): Promise<string> {
		const vidurl = `https://www.youtube.com/watch?v=${id}`

		try {
			const response = await fetch(
				`https://noembed.com/embed?dataType=json&url=${vidurl}`
			)
			const data = await response.json()
			return data.title
		} catch (error) {
			console.error('Error fetching data:', error)
			return ''
		}
	}

	function channelChange(e: CustomEvent) {
		const channel = e.detail as Channel

		$activeChannel = channel
		$showChannelList = false
		$switchingChannel = true
	}

	function removeChannel(e: CustomEvent) {
		const id = e.detail as string

		let newRadio = $radio
		newRadio.channels = newRadio.channels.filter(
			(channel) => channel.id !== id
		)
		$radio = newRadio
		channels = $radio.channels
	}
</script>

<main
	transition:fade={{ duration: 200 }}
	class="absolute top-0 left-0 w-full h-full p-8 overflow-auto z-[60] bg-black/70">
	<div
		class="channel-grid"
		use:clickOutside={() => {
			$showChannelList = false
		}}>
		{#each channels as channel}
			<ChannelItem
				{channel}
				on:channelChange={channelChange}
				on:removeChannel={removeChannel} />
		{/each}
	</div>
</main>

<style scoped>
	.channel-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		grid-template-rows: min-content;
	}
</style>
