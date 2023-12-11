<script lang="ts">
	import {
		activeChannel,
		buffering,
		disableChannelSwitching,
		player,
		playing,
		radio,
		showChannelList,
		switchingChannel,
		videoData,
	} from '$lib/store/store'
	import { rnd } from '$lib/utils/utils'
	import IconBtn from './IconBtn.svelte'

	$: {
		if ($videoData?.errorCode !== null) {
			randomChannel()
		}
	}

	function handlePlayPause() {
		if ($player != null && !$playing) {
			$player.playVideo()
		} else if ($player && $playing) {
			$player.pauseVideo()
		}
	}

	function randomTimeout() {
		setTimeout(
			() => {
				$switchingChannel = false
			},
			rnd(220, 310)
		)
	}

	function changeChannel(offset: number) {
		if ($player == null) return
		$switchingChannel = true
		randomTimeout()
		const activeChannelIndex = $radio.channels.findIndex(
			(channel) => channel.id === $activeChannel.id
		)

		const totalChannels = $radio.channels.length
		const newChannelIndex =
			(activeChannelIndex + offset + totalChannels) % totalChannels

		$activeChannel = $radio.channels[newChannelIndex]
	}

	function randomChannel() {
		if ($player == null) return
		$switchingChannel = true
		randomTimeout()
		let randomChannelIndex = Math.floor(
			Math.random() * $radio.channels.length
		)

		while (randomChannelIndex === $activeChannel.id) {
			randomChannelIndex = Math.floor(
				Math.random() * $radio.channels.length
			)
		}

		$activeChannel = $radio.channels[randomChannelIndex]
	}

	function handleKeyDown(event: KeyboardEvent) {
		if ($disableChannelSwitching || $showChannelList) return

		if (event.key === ' ') {
			handlePlayPause()
		} else if (event.key === 'ArrowLeft') {
			changeChannel(-1)
		} else if (event.key === 'ArrowRight') {
			changeChannel(1)
		} else if (event.key === 'r') {
			randomChannel()
		}
	}

	function openChannelList(e: MouseEvent) {
		e.stopPropagation()
		$showChannelList = true
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<main
	class="flex flex-col items-start gap-2 lg:items-center lg:gap-10 lg:flex-row">
	<div class="flex-1 hidden w-1/3 h-full overflow-hidden lg:flex"></div>

	<section
		class="flex items-center flex-1 gap-2 lg:gap-4 select-justify-center">
		<div class="flex items-center justify-end flex-1 gap-1 shrink-0">
			<IconBtn icon="pixelarticons:shuffle" on:click={randomChannel} />
			<IconBtn
				icon="pixelarticons:prev"
				on:click={() => changeChannel(-1)} />
			<IconBtn
				icon="pixelarticons:next"
				on:click={() => changeChannel(1)} />
		</div>

		{#if $playing}
			<IconBtn icon="pixelarticons:pause" on:click={handlePlayPause} />
		{:else}
			<IconBtn icon="pixelarticons:play" on:click={handlePlayPause} />
		{/if}

		<slot />
	</section>

	<button
		on:click={openChannelList}
		type="button"
		class="flex flex-row-reverse items-center justify-end flex-1 max-w-full gap-4 overflow-hidden lg:w-1/3 lg:flex-row">
		<p class="truncate text-glow">
			{#if $buffering}
				...buffering
			{:else if !$playing}
				...paused
			{:else if $videoData != null}
				{$videoData.title}
			{/if}
		</p>

		<div class="flex items-center justify-center w-8 h-8">
			{#if $buffering}
				<svg
					class="icon"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					><rect
						width="10"
						height="10"
						x="1"
						y="1"
						fill="#ffffff"
						rx="1"
						><animate
							id="svgSpinnersBlocksShuffle30"
							fill="freeze"
							attributeName="x"
							begin="0;svgSpinnersBlocksShuffle3b.end"
							dur="0.2s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle31"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle38.end"
							dur="0.2s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle32"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle39.end"
							dur="0.2s"
							values="13;1" /><animate
							id="svgSpinnersBlocksShuffle33"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle3a.end"
							dur="0.2s"
							values="13;1" /></rect
					><rect
						width="10"
						height="10"
						x="1"
						y="13"
						fill="#ffffff"
						rx="1"
						><animate
							id="svgSpinnersBlocksShuffle34"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle30.end"
							dur="0.2s"
							values="13;1" /><animate
							id="svgSpinnersBlocksShuffle35"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle31.end"
							dur="0.2s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle36"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle32.end"
							dur="0.2s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle37"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle33.end"
							dur="0.2s"
							values="13;1" /></rect
					><rect
						width="10"
						height="10"
						x="13"
						y="13"
						fill="#ffffff"
						rx="1"
						><animate
							id="svgSpinnersBlocksShuffle38"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle34.end"
							dur="0.2s"
							values="13;1" /><animate
							id="svgSpinnersBlocksShuffle39"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle35.end"
							dur="0.2s"
							values="13;1" /><animate
							id="svgSpinnersBlocksShuffle3a"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle36.end"
							dur="0.2s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle3b"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle37.end"
							dur="0.2s"
							values="1;13" /></rect
					></svg>
			{:else if $playing}
				<svg
					class="icon"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					><rect width="2.8" height="12" x="1" y="6" fill="#ffffff"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="6;1;6" /><animate
							attributeName="height"
							begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="12;22;12" /></rect
					><rect width="2.8" height="12" x="5.8" y="6" fill="#ffffff"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="6;1;6" /><animate
							attributeName="height"
							begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="12;22;12" /></rect
					><rect width="2.8" height="12" x="10.6" y="6" fill="#ffffff"
						><animate
							id="svgSpinnersBarsScaleMiddle0"
							attributeName="y"
							begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="6;1;6" /><animate
							attributeName="height"
							begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="12;22;12" /></rect
					><rect width="2.8" height="12" x="15.4" y="6" fill="#ffffff"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="6;1;6" /><animate
							attributeName="height"
							begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="12;22;12" /></rect
					><rect width="2.8" height="12" x="20.2" y="6" fill="#ffffff"
						><animate
							id="svgSpinnersBarsScaleMiddle1"
							attributeName="y"
							begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="6;1;6" /><animate
							attributeName="height"
							begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".14,.73,.34,1;.65,.26,.82,.45"
							values="12;22;12" /></rect
					></svg>
			{/if}
		</div>
	</button>
</main>
