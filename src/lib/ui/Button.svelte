<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
		href?: string;
		children: Snippet;
		tooltip?: string;
		target?: string;
	}

	let { href, tooltip, class: className, children, target = '_blank', ...rest }: Props = $props();
</script>

{#if href}
	<a {...rest} class={`btn ${className}`} {href} data-tooltip={tooltip} {target}>
		{@render children()}
	</a>
{:else}
	<button {...rest} class={`btn ${className}`} data-tooltip={tooltip}>
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		@apply flex items-center justify-center gap-2 p-2;
	}

	:global(.btn svg) {
		width: 1.5rem;
		height: 1.5rem;
		transition: 150ms;
		filter: var(--filter-glow);
	}

	:global(.btn:hover svg) {
		cursor: pointer;
		filter: var(--filter-glow-bright);
	}

	.btn:focus {
		outline: none;
		filter: var(--filter-glow-shallow);
	}

	[data-tooltip] {
		cursor: pointer;
		position: relative;
	}

	[data-tooltip]::after {
		@apply text-xl;
		filter: var(--filter-glow);
		position: absolute;
		text-align: center;
		width: max-content;
		bottom: 0px;
		left: 50%;
		content: attr(data-tooltip);
		transform: translate(-50%, 110%) scale(0);
		transform-origin: top;
		transition: 0.14s;
	}

	[data-tooltip]:hover:after {
		display: block;
		transform: translate(-50%, 110%) scale(1);
	}
</style>
