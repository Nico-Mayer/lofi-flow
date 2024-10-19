<script lang="ts">
	import { inlineSvg } from '$lib/utils';
	import Button from './ui/Button.svelte';

	function toggleFullscreen() {
		if (document.fullscreenElement === null) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
</script>

<main class="flex w-full justify-end gap-3">
	<Button
		aria-label="Buy me a coffee"
		href="https://buymeacoffee.com/nima94"
		tooltip="Buy me a coffee"
	>
		<svg use:inlineSvg={'https://api.iconify.design/pixelarticons:coffee.svg'}></svg>
	</Button>

	<Button aria-label="github" href="https://github.com/nico-mayer" tooltip="Github">
		<svg use:inlineSvg={'https://api.iconify.design/pixelarticons:github.svg'}></svg>
	</Button>

	<Button aria-label="fullscreen" tooltip="Fullscreen" onclick={() => toggleFullscreen()}>
		<svg use:inlineSvg={'https://api.iconify.design/pixelarticons:arrows-vertical.svg'}></svg>
	</Button>
</main>
