<script lang="ts">
	import {
		activeChannel,
		radio,
		showChannelList,
		switchingChannel,
	} from '$lib/store/store'
	import { rnd } from '$lib/utils/utils'
	import { onMount } from 'svelte'

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
			return '' // or handle the error in a way that makes sense for your application
		}
	}
</script>

<main
	class="absolute top-0 left-0 z-30 w-full h-full p-8 overflow-auto bg-black/50">
	<div
		class="channel-grid"
		use:clickOutside={() => {
			$showChannelList = false
		}}>
		{#each channels as channel}
			<button
				on:click={() => handleChannelChange(channel)}
				class="w-full max-w-full p-4 m-auto">
				<div
					class:glow={$activeChannel.id === channel.id}
					class:active={$activeChannel.id === channel.id}>
					<img
						src={`http://img.youtube.com/vi/${channel.id}/maxresdefault.jpg`}
						alt="channel-thumbnail" />
					<div class="p-2 bg-white">
						<!-- Your content goes here -->
						<p class="text-lg font-semibold">{channel.title}</p>
						<p>
							{channel.id}
						</p>
					</div>
				</div>
			</button>
		{/each}
	</div>
</main>

<style>
	.channel-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		grid-template-rows: min-content;
	}
	.active {
		border: 2px solid rgba(0, 255, 0, 0.5);
	}
</style>
