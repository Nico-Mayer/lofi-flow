<script lang="ts">
	import RadioListItem from './RadioListItem.svelte';
	import { activeRadio, dailyRadios, favorites, radioListOpen } from './store.svelte';
	import Button from './ui/Button.svelte';
	import Modal from './ui/Modal.svelte';
	import { clickOutside } from './utils';

	let showNewRadioModal: boolean = $state(false);

	let filteredDailyRadios = $derived(
		dailyRadios.value.filter((radio) => {
			return !favorites.value.some((favorite) => radio.id.videoId === favorite.id.videoId);
		})
	);

	function onclick(radio: Radio): void {
		activeRadio.value = radio;
		exitRadioList();
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Escape') {
			exitRadioList();
		}
	}

	async function addToFavorites(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		showNewRadioModal = true;

		/* const url = prompt('Please enter YT a URL:');

		if (url) {
			const response = await fetch(`/api/getVideo?url=${url}`);
			const data = await response.json();

			if (data.ok) {
				favorites.value = [data.radio, ...favorites.value];
				alert(`Added video to favorites`);
			} else {
				alert('Something went wrong');
			}
		} else {
			alert('No URL entered.');
		} */
	}

	function onClickOutside() {
		console.log('click outside ');
		exitRadioList();
	}

	function exitRadioList() {
		if (showNewRadioModal) return;
		radioListOpen.value = false;
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<main class="z-5 absolute left-0 top-0 h-full w-full overflow-auto">
	<div class="absolute left-0 top-0 h-full w-full bg-black/25 backdrop-blur-lg"></div>

	<div class="p-4 backdrop-blur-0 md:p-8">
		<nav class="mb-4 flex justify-between">
			<Button onclick={addToFavorites}>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><path fill="currentColor" d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z" /></svg
				>
				<span>New Radio</span>
			</Button>

			<Modal bind:showModal={showNewRadioModal}>
				<div class="flex w-52 flex-col gap-3 p-4 text-white">
					<h2>Add new Radio</h2>
					<form class="flex flex-col" action="">
						<label for="ytUrl">Youtube url</label>
						<input class="glow bg-transparent" type="text" name="ytUrl" id="ytUrl" />

						<div class="mt-2 flex w-full justify-between">
							<Button>
								<span>Add</span>
							</Button>
							<Button>
								<span>Cancel</span>
							</Button>
						</div>
					</form>
				</div>
			</Modal>

			<Button onclick={exitRadioList} tooltip="close">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M5 5h2v2H5zm4 4H7V7h2zm2 2H9V9h2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm2-2v2h-2V9zm2-2v2h-2V7zm0 0V5h2v2z"
					/></svg
				>
			</Button>
		</nav>

		{#if favorites.value.length !== 0}
			<section>
				<h2>Favorites</h2>

				<div class="channel-grid" use:clickOutside={onClickOutside}>
					{#each favorites.value as radio}
						<RadioListItem {radio} {onclick} />
					{/each}
				</div>
			</section>
		{/if}

		{#if filteredDailyRadios}
			<section>
				<h2>Daily radios</h2>
				<div class="channel-grid" use:clickOutside={onClickOutside}>
					{#each filteredDailyRadios as radio}
						<RadioListItem {radio} {onclick} />
					{/each}
				</div>
			</section>
		{/if}
	</div>
</main>

<style>
	.channel-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		grid-template-rows: min-content;
	}
</style>
