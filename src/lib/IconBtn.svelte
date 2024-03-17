<script lang="ts">
	export let icon: string

	let image: HTMLImageElement
</script>

<button
	type="button"
	on:click
	on:mouseenter
	on:mouseleave
	class={`btn ${$$props.class}`}
	on:mousedown={(e) => e.preventDefault()}>
	<img
		bind:this={image}
		draggable="false"
		class="icon"
		src={`https://api.iconify.design/${icon}.svg?color=%23ffffff`}
		alt="btn-icon" />
</button>
