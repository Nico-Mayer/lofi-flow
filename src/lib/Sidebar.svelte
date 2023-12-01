<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	function handleRadioClick(url: string) {
		dispatch('radio-clicked', { url: url })
	}

	let radios = [
		{
			name: 'lofi hip hop radio - beats to relax/study to',
			url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
		},
		{
			name: 'Chill Drive',
			url: 'https://www.youtube.com/watch?v=-uxi6_5cFqw',
		},
	]
</script>

<main class="flex flex-col justify-between h-full w-96 p-10">
	<div class="text-4xl tracking-widest">LOFIRADIO</div>

	<div
		class="border-r overflow-y-auto overflow-x-hidden scrollbar-hide h-full my-5 border-white/30">
		<div class="flex flex-col gap-2 mr-5 my-5 text-sm overflow-hidden">
			{#each radios as radio}
				<button
					class="p-2 text-left"
					on:click={() => handleRadioClick(radio.url)}>
					<span class="whitespace-nowrap">{radio.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<div>footer</div>
</main>
