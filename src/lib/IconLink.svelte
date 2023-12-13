<script lang="ts">
	export let icon: string
	export let url: string
</script>

<a href={url} target="_blank" class={`btn ${$$props.class}`}>
	<img
		draggable="false"
		class="icon"
		src={`https://api.iconify.design/${icon}.svg?color=%23ffffff`}
		alt="link-icon" />
</a>
