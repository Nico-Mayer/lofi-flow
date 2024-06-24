<script lang="ts">
	import { activeRadio } from './store.svelte';

	type Props = {
		radio: Radio;
		onclick: (radio: Radio) => void;
	};

	let { radio, onclick }: Props = $props();

	let mouseInside = $state(false);
</script>

<button
	class="group relative flex h-full w-full flex-col overflow-hidden p-4"
	class:active={radio.id.videoId === activeRadio.value.id.videoId}
	onclick={() => onclick(radio)}
	onmouseenter={() => (mouseInside = true)}
	onmouseleave={() => (mouseInside = false)}
>
	<img
		draggable="false"
		loading="lazy"
		src={radio.snippet.thumbnails.high.url}
		alt="channel-thumbnail"
		class="h-64 w-full object-cover md:h-32"
	/>
	<span class="title">{radio.snippet.title}</span>
</button>

<style>
	.title {
		display: block;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		filter: none;
	}

	.active img {
		border: 1px solid var(--color-secondary);
		filter: var(--filter-glow);
	}

	.active .title {
		filter: var(--filter-glow);
	}
</style>
