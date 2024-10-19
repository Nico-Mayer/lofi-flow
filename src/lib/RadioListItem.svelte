<script lang="ts">
	import { inlineSvg } from '$lib/utils';
	import { activeRadio, favorites } from './store.svelte';
	import Button from './ui/Button.svelte';

	type Props = {
		radio: Radio;
		fav: boolean;
		onclick: (radio: Radio) => void;
	};

	let { radio, fav, onclick }: Props = $props();
	let active = $derived(radio.id.videoId === activeRadio.value?.id.videoId);

	function toggleFavorite(e: Event) {
		e.stopPropagation();

		if (fav) {
			favorites.value = favorites.value.filter((entry) => entry.id.videoId !== radio.id.videoId);
		} else {
			favorites.value = [radio, ...favorites.value];
		}
	}
</script>

<button class="radio-list-item group relative" class:active onclick={(): void => onclick(radio)}>
	{#if active}
		<svg
			class="play-icon absolute m-2"
			use:inlineSvg={'https://api.iconify.design/svg-spinners:bars-scale.svg'}
		></svg>
	{/if}

	<img
		draggable="false"
		loading="lazy"
		src={radio.snippet.thumbnails.high.url}
		alt="channel-thumbnail"
		class="thumbnail"
	/>

	{#if fav}
		<Button
			class="!absolute right-0 m-2 !scale-0 transition-all duration-200 group-hover:!scale-100"
			onclick={toggleFavorite}
		>
			<svg use:inlineSvg={'https://api.iconify.design/material-symbols:star.svg'}></svg>
		</Button>
	{:else}
		<Button
			class="!absolute right-0 m-2 !scale-0 transition-all duration-200 group-hover:!scale-100"
			onclick={toggleFavorite}
		>
			<svg use:inlineSvg={'https://api.iconify.design/material-symbols:star-outline.svg'}></svg>
		</Button>
	{/if}

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
