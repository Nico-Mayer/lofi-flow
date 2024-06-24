<script lang="ts">
	import { fade } from 'svelte/transition';
	import RadioListItem from './RadioListItem.svelte';
	import { activeRadio, dailyRadios, favorites, radioListOpen } from './store.svelte';

	type Props = {
		player: Player;
	};

	let { player }: Props = $props();

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
		player.loadVideoById(activeRadio.value.id.videoId);
		radioListOpen.value = false;
	}
</script>

<main
	transition:fade={{ duration: 200 }}
	class="z-5 absolute left-0 top-0 h-full w-full overflow-auto bg-black/70 p-8"
>
	<div class="channel-grid">
		{#each radios as radio}
			<RadioListItem {radio} {onclick} />
		{/each}
	</div>
</main>

<style scoped>
	.channel-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		grid-template-rows: min-content;
	}
</style>
