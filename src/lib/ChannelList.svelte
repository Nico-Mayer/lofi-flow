<script lang="ts">
	import {
		activeChannel,
		radio,
		showChannelList,
		switchingChannel,
	} from '$lib/stores/store'
	import { rnd } from '$lib/utils/utils'

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
</script>

<main
	class="absolute top-0 left-0 z-30 w-full h-full p-8 overflow-auto bg-black/50">
	<div
		class="channel-grid"
		use:clickOutside={() => {
			$showChannelList = false
		}}>
		{#each $radio?.channels as channel}
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
						<p class="text-lg font-semibold">Channel:</p>
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
