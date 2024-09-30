<script lang="ts">
	import { inlineSvg } from '$lib/inlineSvg';
	import { activeRadio } from './store.svelte';

	type Props = {
		radio: Radio;
		onclick: (radio: Radio) => void;
	};

	let { radio, onclick }: Props = $props();
	let active = $derived(radio.id.videoId === activeRadio.value?.id.videoId);
</script>

<button class="radio-list-item group relative" class:active onclick={(): void => onclick(radio)}>
	{#if active}
		<svg
			class="play-icon absolute m-2"
			use:inlineSvg={'https://api.iconify.design/svg-spinners:bars-scale.svg'}
		></svg>
	{/if}

	<input
		class="absolute right-0 m-2 hidden group-hover:block"
		onselect={(e) => {
			e.preventDefault();
			e.stopPropagation();
		}}
		type="checkbox"
	/>

	<img
		draggable="false"
		loading="lazy"
		src={radio.snippet.thumbnails.high.url}
		alt="channel-thumbnail"
		class="thumbnail"
	/>

	<span class="title">{radio.snippet.title}</span>
</button>

<style lang="postcss">
	.radio-list-item {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		overflow: visible;
		opacity: 0.8;
		transition: opacity 500ms;
	}

	.radio-list-item:hover {
		opacity: 1;
	}

	.radio-list-item:hover .thumbnail {
		border: 1px solid var(--color-secondary);
	}

	.thumbnail {
		width: 100%;
		height: 8rem;
		border: 1px solid transparent;
		object-fit: cover;
		transition: 150ms;

		@media (max-width: 768px) {
			height: 16rem;
		}
	}

	.title {
		display: block;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		filter: none;
	}

	.active {
		opacity: 1;
	}

	.active .thumbnail {
		border: 1px solid var(--color-secondary);
		box-shadow: var(--green-glow);
	}
	.active .title {
		text-shadow: var(--green-glow);
	}
	.active .play-icon {
		@apply absolute m-2;
		filter: var(--green-glow-drop-shadow);
	}
</style>
