<script lang="ts">
	import IconBtn from '$lib/IconBtn.svelte'
	import IconLink from '$lib/IconLink.svelte'
	import { activeChannel } from '$lib/store/store'
	import { createEventDispatcher } from 'svelte'

	export let channel: Channel

	let thumbnail: HTMLImageElement
	let mouseInside = false

	const dispatch = createEventDispatcher()

	function channelChange(channel: Channel) {
		if ($activeChannel.id === channel.id) return
		dispatch('channelChange', channel)
	}

	function removeChannel(e: MouseEvent, id: string) {
		e.stopPropagation()
		dispatch('removeChannel', id)
	}
</script>

<button
	class="relative flex flex-col w-full h-full p-2 group"
	on:mouseenter={() => (mouseInside = true)}
	on:mouseleave={() => (mouseInside = false)}
	on:click={() => channelChange(channel)}>
	<IconLink
		class="absolute top-4 right-4"
		url={`https://www.youtube.com/watch?v=${channel.id}`}
		icon="pixelarticons:external-link" />

	<IconBtn
		class="absolute transition-all duration-300 ease-in-out scale-0 opacity-0 top-4 left-4 group-hover:opacity-100 group-hover:scale-100"
		on:click={(e) => removeChannel(e, channel.id)}
		icon="pixelarticons:close" />

	<img
		bind:this={thumbnail}
		draggable="false"
		class:active={$activeChannel.id === channel.id}
		class:highlight={mouseInside}
		class="object-cover w-full h-full max-h-96"
		src={`http://img.youtube.com/vi/${channel.id}/mqdefault.jpg`}
		alt="channel-thumbnail" />

	<p
		class="w-full px-1 overflow-hidden text-lg text-left truncate text-ellipsis text-glow">
		{channel.title}
	</p>
</button>

<style>
	.highlight {
		animation: glow 3s ease-in-out infinite;
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
