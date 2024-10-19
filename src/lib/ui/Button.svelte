<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
		ref?: HTMLButtonElement | HTMLAnchorElement;
		href?: string;
		children: Snippet;
		tooltip?: string;
		tooltipPosition?: string;
		target?: string;
	}

	let {
		ref = $bindable(),
		href,
		tooltip = ' ',
		tooltipPosition = 'bot',
		class: className,
		children,
		target = '_blank',
		...rest
	}: Props = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		{...rest}
		class={`btn ${className} tooltip-${tooltipPosition}`}
		{href}
		data-tooltip={tooltip}
		{target}
	>
		{@render children()}
	</a>
{:else}
	<button
		bind:this={ref}
		{...rest}
		class={`btn ${className} tooltip-${tooltipPosition}`}
		data-tooltip={tooltip}
	>
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

	/* Base tooltip styles */
	[data-tooltip] {
		cursor: pointer;
		position: relative;
	}

	[data-tooltip]::after {
		@apply text-xl;
		position: absolute;
		text-align: center;
		width: max-content;
		content: attr(data-tooltip);
		transform: scale(0);
		transition: 0.14s;
		text-shadow: var(--green-glow-hover);
		pointer-events: none; /* Ensures tooltip doesn't interfere with cursor */
		transform-origin: center;
	}

	/* Bottom tooltip */
	.tooltip-bot::after {
		bottom: 0px;
		left: 50%;
		transform: translate(-50%, 110%) scale(0);
		transform-origin: top;
	}

	.tooltip-bot:hover::after {
		transform: translate(-50%, 110%) scale(1);
	}

	/* Top tooltip */
	.tooltip-top::after {
		top: 0px;
		left: 50%;
		transform: translate(-50%, -110%) scale(0);
		transform-origin: bottom;
	}

	.tooltip-top:hover::after {
		transform: translate(-50%, -110%) scale(1);
	}

	/* Left tooltip */
	.tooltip-left::after {
		top: 50%;
		left: 0px;
		transform: translate(-110%, -50%) scale(0);
		transform-origin: right;
	}

	.tooltip-left:hover::after {
		transform: translate(-110%, -50%) scale(1);
	}

	/* Right tooltip */
	.tooltip-right::after {
		top: 50%;
		right: 0px;
		transform: translate(110%, -50%) scale(0);
		transform-origin: left;
	}

	.tooltip-right:hover::after {
		transform: translate(110%, -50%) scale(1);
	}
</style>
