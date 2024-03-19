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
		if (e.key === 'a') {
			if (showAddChannel) return
			showAddChannel = true

			setTimeout(() => {
				if (!showAddChannel) return
				const input = document.querySelector(
					'#youtube-url-input'
				) as HTMLInputElement | null
				input?.focus()
			}, 250)
		} else if (e.key === 'Escape') {
			showInfo = false
			showAddChannel = false
		}
	}

	function handleAddChannel(e: Event) {
		e.preventDefault()

		const target = e.target as HTMLElement | null
		if (!target) return

		const input = target.querySelector('input') as HTMLInputElement | null
		if (!input) return

		const url = input.value.trim()
		if (!url) {
			alert('Please provide a YouTube URL')
			showAddChannel = false
			return
		}

		const id = getIDfromYoutubeURL(url)
		if (!id) {
			alert('Invalid YouTube URL')
			showAddChannel = false
			return
		}

		if (!isValidYouTubeId(id)) {
			alert('Invalid YouTube Video ID')
			showAddChannel = false
			return
		}

		const newRadio = { ...$radio }
		newRadio.channels.push({ id })
		$radio = newRadio

		alert('Channel added')
		showAddChannel = false
	}

	function getIDfromYoutubeURL(url: string) {
		// Check if the URL is valid
		const pattern =
			/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
		const match = url.match(pattern)

		if (match && match[1]) {
			return match[1] // Return the video ID
		} else {
			return null // URL is not valid or doesn't contain a video ID
		}
	}

	function isValidYouTubeId(id: string) {
		var pattern = /^[a-zA-Z0-9_-]{11}$/
		return pattern.test(id)
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<main class="relative flex items-center justify-between h-9">
	<section id="left">
		{#if showAddChannel}
			<form
				transition:fade={{ duration: 200 }}
				on:submit={handleAddChannel}>
				<input
					type="text"
					placeholder="youtube url..."
					id="youtube-url-input" />
				<button type="submit" class="sub-btn">add</button>
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
			class="absolute right-0 flex flex-col text-right top-11"
			id="right">
			<h2 class="mb-2 text-2xl underline text-glow">Controls:</h2>

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
				<div class="h-2"></div>
				<li>
					<span class="keybind">&#8693; </span>
					<span class="text-glow">volume</span>
				</li>
				<li>
					<span class="keybind">M </span>
					<span class="text-glow">mute</span>
				</li>
				<div class="h-2"></div>
				<li>
					<span class="keybind">L </span>
					<span class="text-glow">low power mode</span>
				</li>
				<li>
					<span class="keybind">A </span>
					<span class="text-glow">add new channel</span>
				</li>
				<li>
					<span class="keybind">ESC </span>
					<span class="text-glow">close this</span>
				</li>
			</ul>
		</section>
	{/if}
</main>

<style>
	.keybind {
		color: #fff;
		filter: drop-shadow(0px 0px 2px #ff5656) drop-shadow(0px 0px 8px red);
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
