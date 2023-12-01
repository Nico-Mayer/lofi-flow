<script lang="ts">
	import { activeChannel } from '$lib/stores/store'

	export let channel: Channel

	function handleChannelChange() {
		$activeChannel = channel
	}
</script>

<button
	class="p-2 px-4 text-left flex items-center gap-2 rounded border border-transparent hover:border-white/50"
	on:click={handleChannelChange}>
	<div class="i-mdi-audio-input-stereo-minijack text-2xl" />
	<span class="whitespace-nowrap truncate">
		{channel.name}
	</span>
</button>
