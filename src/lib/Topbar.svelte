<script lang="ts">
	import { lowPowerMode } from '$lib/store/store'
	import IconBtn from './IconBtn.svelte'
	import IconLink from './IconLink.svelte'

	function toggleFullscreen() {
		document.fullscreenElement == null
			? document.documentElement.requestFullscreen()
			: document.exitFullscreen()
	}
</script>

<main class="flex items-center justify-between">
	<section id="left"></section>

	<section class="flex gap-2">
		<IconBtn
			icon="pixelarticons:chevrons-vertical"
			on:click={toggleFullscreen} />
		<IconLink
			icon="mdi:github"
			url="https://github.com/nico-mayer/lofi-flow" />
		<IconLink
			icon="line-md:buy-me-a-coffee-filled"
			url="https://www.buymeacoffee.com/nima94" />
		<IconBtn
			icon="material-symbols:settings"
			on:click={() => ($lowPowerMode = !$lowPowerMode)} />
	</section>
</main>
