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

	let channels: Channel[] = []

	onMount(() => {
		channels = $radio.channels

		for (let i = 0; i < channels.length; i++) {
			getTitle(channels[i].id).then((title) => {
				channels[i].title = title
			})
		}
	})

	function clickOutside(node: HTMLDivElement, cb: Function) {
		function onClick(event: MouseEvent) {
			if (!node.contains(event.target as Node)) {
				cb()
			}
		}

		document.addEventListener('click', onClick)
		return {
			update(newCb: Function) {
				cb = newCb
			},
			destroy() {
				document.removeEventListener('click', onClick)
			},
		}
	}

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
</script>

<main
	transition:fade={{ duration: 200 }}
	class="absolute top-0 left-0 z-30 w-full h-full p-8 overflow-auto bg-black/50">
	<div
		class="channel-grid"
		use:clickOutside={() => {
			$showChannelList = false
		}}>
		{#each channels as channel}
			<div class="relative w-full max-w-full p-4 m-autot">
				<a
					target="_blank"
					href={`https://www.youtube.com/watch?v=${channel.id}`}
					class="absolute top-6 right-6 btn">
					<img
						draggable="false"
						class="icon"
						src="https://api.iconify.design/pixelarticons:external-link.svg?color=%23ffffff"
						alt="link-icon" />
				</a>

				<button
					class:active={$activeChannel.id === channel.id}
					class="w-full h-full channel-item"
					on:click={() => handleChannelChange(channel)}>
					<img
						draggable="false"
						src={`http://img.youtube.com/vi/${channel.id}/mqdefault.jpg`}
						alt="channel-thumbnail" />
					<div class="p-2 bg-white">
						<!-- Your content goes here -->
						<p class="text-lg font-semibold truncate text-ellipsis">
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
