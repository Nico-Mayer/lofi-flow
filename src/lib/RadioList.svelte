<script lang="ts">
	import RadioListItem from './RadioListItem.svelte';
	import { activeRadio, dailyRadios, favorites, radioListOpen } from './store.svelte';
	import { clickOutside } from './utils';

	let radios = $state(new Set<Radio>());

	favorites.value.forEach((id) => {
		radios.add(id);
	});

	if (dailyRadios.value !== null) {
		dailyRadios.value.forEach((radio) => {
			radios.add(radio);
		});
	}

	function onclick(radio: Radio): void {
		activeRadio.value = radio;
		radioListOpen.value = false;
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Escape') {
			radioListOpen.value = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<main class="z-5 absolute left-0 top-0 h-full w-full overflow-auto bg-black/70 p-4 md:p-8">
	<div
		class="channel-grid"
		use:clickOutside={() => {
			console.log('click outside ');
			radioListOpen.value = false;
		}}
	>
		{#each radios as radio}
			<RadioListItem {radio} {onclick} />
		{/each}
	</div>
</main>

<style>
	.channel-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		grid-template-rows: min-content;
	}
</style>
