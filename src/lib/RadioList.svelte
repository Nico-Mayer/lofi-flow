<script lang="ts">
	import { fade } from 'svelte/transition';
	import RadioListItem from './RadioListItem.svelte';
	import { dailyRadios, favorites, radioListOpen } from './store.svelte';

	type Props = {
		player: Player;
	};

	let { player }: Props = $props();

	let radios = $state(new Set<string>());
	favorites.value.forEach((id) => {
		radios.add(id);
	});

	if (dailyRadios.value !== null) {
		dailyRadios.value.forEach((radio) => {
			radios.add(radio.id.videoId);
		});
	}

	function onclick(id: string): void {
		player.loadVideoById(id);
		radioListOpen.value = false;
	}
</script>

<main
	transition:fade={{ duration: 200 }}
	class="z-5 absolute left-0 top-0 h-full w-full overflow-auto bg-black/70 p-8"
>
	<div class="channel-grid">
		{#each radios as id}
			<RadioListItem {id} {onclick} />
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
