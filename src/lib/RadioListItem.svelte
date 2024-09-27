<script lang="ts">
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
			class="play-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			><rect width="2.8" height="12" x="1" y="6" fill="currentColor"
				><animate
					id="svgSpinnersBarsScale0"
					attributeName="y"
					begin="0;svgSpinnersBarsScale1.end-0.1s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="6;1;6"
				/><animate
					attributeName="height"
					begin="0;svgSpinnersBarsScale1.end-0.1s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="12;22;12"
				/></rect
			><rect width="2.8" height="12" x="5.8" y="6" fill="currentColor"
				><animate
					attributeName="y"
					begin="svgSpinnersBarsScale0.begin+0.1s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="6;1;6"
				/><animate
					attributeName="height"
					begin="svgSpinnersBarsScale0.begin+0.1s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="12;22;12"
				/></rect
			><rect width="2.8" height="12" x="10.6" y="6" fill="currentColor"
				><animate
					attributeName="y"
					begin="svgSpinnersBarsScale0.begin+0.2s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="6;1;6"
				/><animate
					attributeName="height"
					begin="svgSpinnersBarsScale0.begin+0.2s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="12;22;12"
				/></rect
			><rect width="2.8" height="12" x="15.4" y="6" fill="currentColor"
				><animate
					attributeName="y"
					begin="svgSpinnersBarsScale0.begin+0.3s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="6;1;6"
				/><animate
					attributeName="height"
					begin="svgSpinnersBarsScale0.begin+0.3s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="12;22;12"
				/></rect
			><rect width="2.8" height="12" x="20.2" y="6" fill="currentColor"
				><animate
					id="svgSpinnersBarsScale1"
					attributeName="y"
					begin="svgSpinnersBarsScale0.begin+0.4s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="6;1;6"
				/><animate
					attributeName="height"
					begin="svgSpinnersBarsScale0.begin+0.4s"
					calcMode="spline"
					dur="0.6s"
					keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
					values="12;22;12"
				/></rect
			></svg
		>
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
