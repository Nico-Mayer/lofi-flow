<script lang="ts">
	import {
		activeChannel,
		radio,
		showChannelList,
		switchingChannel,
	} from '$lib/store/store'
	import { rnd } from '$lib/utils/utils'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import IconBtn from './IconBtn.svelte'
	import IconLink from './IconLink.svelte'
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

	function handleChannelChange(channel: Channel) {
		$activeChannel = channel
		$showChannelList = false
		$switchingChannel = true
		setTimeout(
			() => {
				$switchingChannel = false
			},
			rnd(220, 310)
		)
	}

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

	function removeChannel(event: MouseEvent, id: string) {
		event.stopPropagation()
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
			<div class="relative w-full max-w-full p-4 m-auto group">
				<IconLink
					class="absolute top-4 right-4"
					url={`https://www.youtube.com/watch?v=${channel.id}`}
					icon="pixelarticons:external-link" />

				<IconBtn
					class="absolute top-4 left-4 !hidden group-hover:!flex"
					on:click={(e) => removeChannel(e, channel.id)}
					icon="pixelarticons:close" />

				<button
					class="w-full h-full"
					on:click={() => handleChannelChange(channel)}>
					<div class="channel-item">
						<img
							draggable="false"
							class:active={$activeChannel.id === channel.id}
							class="object-cover w-full h-full max-h-96"
							src={`http://img.youtube.com/vi/${channel.id}/mqdefault.jpg`}
							alt="channel-thumbnail" />
					</div>

					<div class="text-glow">
						<!-- Your content goes here -->
						<p class="text-lg truncate text-ellipsis">
							{channel.title}
						</p>
					</div>
				</button>
			</div>
		{/each}
	</div>
</main>

<style scoped>
	.channel-item:hover {
		box-shadow: 0px 0px 8px #99ff99;
		animation: glow 3s ease-in-out infinite;
	}
	.channel-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		grid-template-rows: min-content;
	}
	.active {
		border: 1px solid #99ff99;
		animation: glow 3s ease-in-out infinite;
	}

	@keyframes glow {
		0% {
			box-shadow: 0px 0px 10px #99ff99;
		}
		50% {
			box-shadow: 0px 0px 20px #99ff99;
		}
		100% {
			box-shadow: 0px 0px 10px #99ff99;
		}
	}
</style>
