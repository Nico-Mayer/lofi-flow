<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
		ref?: HTMLElement | null;
		href?: string;
		children: Snippet;
		tooltip?: string;
		target?: string;
	}

	let {
		ref = $bindable(),
		href,
		tooltip = ' ',
		class: className,
		children,
		target = '_blank',
		...rest
	}: Props = $props();
</script>

{#if href}
	<a bind:this={ref} {...rest} class={`btn ${className}`} {href} data-tooltip={tooltip} {target}>
		{@render children()}
	</a>
{:else}
	<button bind:this={ref} {...rest} class={`btn ${className}`} data-tooltip={tooltip}>
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		@apply m-1 flex items-center justify-center gap-2 rounded-md p-1 text-white;
	}

	.btn:hover {
		cursor: pointer;
	}

	:global(.btn span) {
		@apply text-lg;
		text-shadow: var(--green-glow);
		transition: text-shadow 250ms;
		overflow: visible;
	}

	:global(.btn svg) {
		width: 1.5rem;
		height: 1.5rem;
		transition: filter 250ms;
		filter: var(--green-glow-drop-shadow);
	}

	:global(.btn:hover span) {
		text-shadow: var(--green-glow-hover);
	}

	:global(.btn:hover svg) {
		cursor: pointer;
		filter: var(--green-glow-drop-shadow-hover);
	}

	.btn:focus {
		outline: none;
		filter: var(--green-glow-drop-shadow);
	}

	[data-tooltip] {
		cursor: pointer;
		position: relative;
	}

	[data-tooltip]::after {
		@apply text-xl;
		position: absolute;
		text-align: center;
		width: max-content;
		bottom: 0px;
		left: 50%;
		content: attr(data-tooltip);
		transform: translate(-50%, 110%) scale(0);
		transform-origin: top;
		transition: 0.14s;
		text-shadow: var(--green-glow-hover);
	}

	[data-tooltip]:hover:after {
		display: block;
		transform: translate(-50%, 110%) scale(1);
	}
</style>
