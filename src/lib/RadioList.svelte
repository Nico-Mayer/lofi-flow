<script lang="ts">
	import { inlineSvg } from '$lib/inlinesvg';
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

	async function addToFavorites(event: SubmitEvent) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		let url = data.get('ytUrl') as string;

		if (url) {
			const response = await fetch(`/api/getVideo?url=${url}`);
			const data = await response.json();

			if (data.ok) {
				const duplicate = favorites.value.some(
					(radio) => radio.id.videoId === data.radio.id.videoId
				);

				if (duplicate) {
					showNewRadioModal = false;
					form.reset();
					return;
				}

				favorites.value = [data.radio, ...favorites.value];
			}
		}
		form.reset();
		showNewRadioModal = false;
	}

	function onClickOutside() {
		exitRadioList();
	}

	function exitRadioList() {
		if (showNewRadioModal) return;
		radioListOpen.value = false;
	}

	function closeModal(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		showNewRadioModal = false;
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<main class="z-5 absolute left-0 top-0 h-full w-full overflow-auto">
	<div class="absolute left-0 top-0 h-full w-full bg-black/45 backdrop-blur-lg"></div>

	<div class="p-4 backdrop-blur-0 md:p-8">
		<nav class="mb-4 flex justify-between">
			<Button onclick={() => (showNewRadioModal = true)}>
				<svg use:inlineSvg={'https://api.iconify.design/pixelarticons:plus.svg'}></svg>
				<span>New Radio</span>
			</Button>

			<Modal bind:showModal={showNewRadioModal}>
				<h2 class="text-glow-green text-2xl">Add new Radio</h2>
				<form class="flex flex-col" action="" onsubmit={addToFavorites}>
					<label class="text-glow-green" for="ytUrl">Youtube url</label>
					<input
						class="text-glow-green w-60 rounded border bg-transparent px-1 focus:outline-none"
						type="text"
						name="ytUrl"
						id="ytUrl"
					/>

					<div class="mt-2 flex w-full justify-between">
						<Button>
							<span>Add</span>
						</Button>
						<Button onclick={closeModal}>
							<span>Cancel</span>
						</Button>
					</div>
				</form>
			</Modal>

			<Button onclick={exitRadioList} tooltip="close">
				<svg use:inlineSvg={'https://api.iconify.design/pixelarticons:close.svg'}></svg>
			</Button>
		</nav>

		{#if favorites.value.length !== 0}
			<section>
				<h2 class="text-glow-green text-xl">Favorites</h2>

				<div class="channel-grid" use:clickOutside={onClickOutside}>
					{#each favorites.value as radio}
						<RadioListItem {radio} {onclick} />
					{/each}
				</div>
			</section>
		{/if}

		{#if filteredDailyRadios}
			<section>
				<h2 class="text-glow-green text-xl">Daily radios</h2>
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
