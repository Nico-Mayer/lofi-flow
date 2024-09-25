<script lang="ts">
	import { activeRadio } from './store.svelte';

	type Props = {
		radio: Radio;
		onclick: (radio: Radio) => void;
	};

	let { radio, onclick }: Props = $props();
</script>

<button
	class="radio-list-item"
	class:active={radio.id.videoId === activeRadio.value?.id.videoId}
	onclick={(): void => onclick(radio)}
>
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
		overflow: hidden;
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

	.radio-list-item:hover .thumbnail {
		border: 1px solid var(--color-secondary);
		filter: var(--filter-glow-dimmed);
	}

	.title {
		display: block;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		filter: none;
	}

	.active .thumbnail {
		border: 1px solid var(--color-secondary);
		filter: var(--filter-glow);
	}

	.active .title {
		filter: var(--filter-glow);
	}
</style>
