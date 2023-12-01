<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let channels: Channel[] = []
</script>

<main class="w-96 p-10">
	<div
		class="border border-white/10 rounded flex flex-col justify-between h-full p-4">
		<div class="heading">LOFIRADIO</div>

		<div
			class="overflow-y-auto overflow-x-hidden scrollbar-hide h-full my-5">
			<div class="flex flex-col gap-2 mr-5 my-5 text-sm overflow-hidden">
				{#each channels as channel}
					<button
						class="p-2 text-left"
						on:click={() =>
							dispatch('channelClicked', channel.url)}>
						<span class="whitespace-nowrap">{channel.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<div>footer</div>
	</div>
</main>
