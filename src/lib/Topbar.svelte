<script lang="ts">
	import IconBtn from './IconBtn.svelte'

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
		<IconBtn icon="mdi:github" />
		<IconBtn icon="pixelarticons:heart" />
		<IconBtn icon="material-symbols:settings" />
	</section>
</main>
