<script lang="ts">
	import ChannelItem from '$lib/ChannelItem.svelte'

	export let channels: Channel[] = []
</script>

<main class="w-96 h-full glass">
	<div class="flex flex-col justify-between h-full p-4 px-8">
		<div class="heading">LOFIRADIO</div>

		<div
			class="overflow-y-auto overflow-x-hidden scrollbar-hide h-full my-5">
			<div class="flex flex-col gap-2 my-5 overflow-hidden">
				{#each channels as channel}
					<ChannelItem {channel} />
				{/each}
			</div>
		</div>

		<div>footer</div>
	</div>
</main>
