<script lang="ts">
	export let icon: string
</script>

<button
	type="button"
	on:click
	class={`btn ${$$props.class}`}
	on:mousedown={(e) => e.preventDefault()}>
	<img
		draggable="false"
		class="icon"
		src={`https://api.iconify.design/${icon}.svg?color=%23ffffff`}
		alt="btn-icon" />
</button>
