<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		showModal?: boolean;
		children: Snippet;
	}

	let { showModal = $bindable(), children }: Props = $props();
	let dialog: HTMLDialogElement | null = $state(null);

	$effect(() => {
		if (showModal) dialog?.showModal();
	});

	$effect(() => {
		if (!showModal) dialog?.close();
	});
</script>

<dialog class="text-white" bind:this={dialog}>
	<div class="flex w-full max-w-xl flex-col border p-12">
		{@render children()}
	</div>
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
