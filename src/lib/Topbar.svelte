<script lang="ts">
	import { fade } from 'svelte/transition'
	import IconBtn from './IconBtn.svelte'
	import IconLink from './IconLink.svelte'
	import { radio } from './store/store'
	import { clickOutside } from './utils/utils'

	let showInfo = false
	let showAddChannel = false

	function toggleFullscreen() {
		document.fullscreenElement == null
			? document.documentElement.requestFullscreen()
			: document.exitFullscreen()
	}

	function toggleInfo(e: MouseEvent) {
		e.stopPropagation()
		showInfo = !showInfo
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'a') showAddChannel = !showAddChannel
	}

	function handleAddChannel(e: Event) {
		e.preventDefault()
		if (e.target == null) return
		const input = (e.target as HTMLInputElement).querySelector('input')
		if (input == null) return
		const id = input.value
		if (id == null || id === '') return

		function isValidYouTubeId(id: string) {
			var pattern = /^[a-zA-Z0-9_-]{11}$/
			return pattern.test(id)
		}

		if (!isValidYouTubeId(id)) {
			alert('Invalid YouTube ID')
			return
		}

		let newRadio = $radio
		newRadio.channels.push({
			id,
		})
		$radio = newRadio
		showAddChannel = false
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<main class="relative flex items-center justify-between">
	<section id="left">
		{#if showAddChannel}
			<form
				transition:fade={{ duration: 200 }}
				on:submit={handleAddChannel}>
				<input type="text" placeholder="Youtube ID..." />
				<button type="submit" class="sub-btn">Add</button>
			</form>
		{/if}
	</section>

	<section class="flex gap-2">
		<IconBtn
			icon="mingcute:fullscreen-2-line"
			on:click={toggleFullscreen} />
		<IconLink
			icon="mdi:github"
			url="https://github.com/nico-mayer/lofi-flow" />
		<IconLink
			icon="line-md:buy-me-a-coffee-filled"
			url="https://www.buymeacoffee.com/nima94" />
		<IconBtn icon="material-symbols:info-outline" on:click={toggleInfo} />
	</section>

	{#if showInfo}
		<section
			transition:fade={{ duration: 200 }}
			use:clickOutside={() => {
				showInfo = false
			}}
			class="absolute right-0 text-right top-10"
			id="right">
			<ul>
				<li>
					<span class="keybind">space </span>
					<span class="text-glow">play / pause</span>
				</li>
				<li>
					<span class="keybind">&#8646; </span>
					<span class="text-glow">switch channel</span>
				</li>
				<li>
					<span class="keybind">R </span>
					<span class="text-glow">random channel</span>
				</li>
				<li>
					<span class="keybind">&#8693; </span>
					<span class="text-glow">volume</span>
				</li>
				<li>
					<span class="keybind">M </span>
					<span class="text-glow">mute</span>
				</li>
				<li>
					<span class="keybind">L </span>
					<span class="text-glow">low power mode</span>
				</li>
				<li>
					<span class="keybind">A </span>
					<span class="text-glow">add new channel</span>
				</li>
			</ul>
		</section>
	{/if}
</main>

<style>
	.keybind {
		color: #fff;
		filter: drop-shadow(0px 0px 2px #ff0000) drop-shadow(0px 0px 8px red);
	}

	input {
		background-color: transparent;
		color: white;
		border: white 1px solid;
		@apply rounded px-4;
		filter: drop-shadow(0px 0px 2px #99ff99) drop-shadow(0px 0px 8px green);
		outline: none;
	}
	input::placeholder {
		color: white;
	}

	.sub-btn {
		background-color: transparent;
		color: white;
		border: white 1px solid;
		@apply rounded px-4;
		filter: drop-shadow(0px 0px 2px #99ff99) drop-shadow(0px 0px 8px green);
		outline: none;
	}
</style>
