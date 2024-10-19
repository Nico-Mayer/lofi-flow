<script lang="ts">
	import { playerState } from '$lib/store.svelte';
	import { ytPlayerStateCode } from '$lib/utils';
</script>

<div
	class="darken"
	class:paused={playerState.value === ytPlayerStateCode('paused') ||
		playerState.value === ytPlayerStateCode('buffering')}
></div>

<style>
	.paused {
		background-color: rgba(0, 0, 0, 0.4) !important;
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
