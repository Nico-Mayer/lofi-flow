<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		showModal?: boolean;
		children: Snippet;
	}

	let { showModal = $bindable(), children }: Props = $props();
	let dialog: HTMLDialogElement | null = $state(null);

	$effect(() => {
		if (dialog && showModal) dialog.showModal();
	});
</script>

<dialog bind:this={dialog} onclose={() => (showModal = false)}>
	{@render children()}
</dialog>

<style>
	dialog {
		background: transparent;
	}

	dialog::backdrop {
		@apply backdrop-blur-md;
		background: rgba(0, 0, 0, 0.2);
	}
</style>
