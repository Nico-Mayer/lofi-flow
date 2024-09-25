<script lang="ts">
	import Button from './ui/Button.svelte';

	function toggleFullscreen() {
		if (document.fullscreenElement === null) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
</script>

<main class="flex w-full justify-end">
	<Button aria-label="fullscreen" tooltip="Fullscreen" onclick={() => toggleFullscreen()}>
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M11 11h2V7h2v2h2V7h-2V5h-2V3h-2v2H9v2H7v2h2V7h2zm0 2h2v4h2v2h-2v2h-2v-2H9v-2h2zm-2 4v-2H7v2zm6 0v-2h2v2z"
			/></svg
		>
	</Button>

	<Button aria-label="github" href="https://github.com/nico-mayer" tooltip="Github">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M5 2h4v2H7v2H5zm0 10H3V6h2zm2 2H5v-2h2zm2 2v-2H7v2H3v-2H1v2h2v2h4v4h2v-4h2v-2zm0 0v2H7v-2zm6-12v2H9V4zm4 2h-2V4h-2V2h4zm0 6V6h2v6zm-2 2v-2h2v2zm-2 2v-2h2v2zm0 2h-2v-2h2zm0 0h2v4h-2z"
			/></svg
		>
	</Button>

	<Button
		aria-label="Buy me a coffee"
		href="https://buymeacoffee.com/nima94"
		tooltip="Buy me a coffee"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M4 4h18v7h-4v5H4zm14 5h2V6h-2zm-2-3H6v8h10zm3 14H3v-2h16z"
			/></svg
		>
	</Button>

	<Button aria-label="info" class="btn" tooltip="Info">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M3 3h2v18H3zm16 0H5v2h14v14H5v2h16V3zm-8 6h2V7h-2zm2 8h-2v-6h2z"
			/></svg
		>
	</Button>
</main>
