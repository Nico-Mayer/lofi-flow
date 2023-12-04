<script lang="ts">
	export let icon = ''
	export let size = 'm'

	let url = `https://api.iconify.design/${icon}.svg?color=%23ffffff`
</script>

<img
	class="glow select-none"
	src={url}
	alt="icon"
	class:h-8={size === 'm'}
	class:h-6={size === 's'} />
