<script lang="ts">
	import { buffering, playing } from '$lib/stores/store'
</script>

<div class="darken" class:paused={$playing === false || $buffering}></div>

<style>
	.paused {
		background-color: rgba(0, 0, 0, 0.3) !important;
	}

	.darken {
		transition: background 0.5s ease-in-out;
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 0;
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
