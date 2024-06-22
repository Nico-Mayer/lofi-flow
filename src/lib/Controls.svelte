<script lang="ts">
	import { activeRadioData, playerError, playerState, radioListOpen, volume } from './store.svelte';
	type Props = {
		player: YT.Player;
	};

	let { player }: Props = $props();

	function handleVolumeChange() {
		player.setVolume(volume.value);
	}

	function playPause() {
		if (player.getPlayerState() == YT.PlayerState.PLAYING) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
	}

	function openRadioList() {
		radioListOpen.value = true;
	}
</script>

<main>
	{#if playerError.value}
		<section class="px-2">
			<span class="glow-red">Error loading this radio, redirecting to other radio</span>
		</section>
	{/if}

	<section class="flex items-center">
		<button class="btn" onclick={playPause}>
			{#if playerState.value === YT.PlayerState.PLAYING}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path fill="currentColor" d="M8 5v14l11-7z" />
				</svg>
			{/if}
		</button>
		<button class="btn">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M18 5h-2v2h2v2h-6v2h-2v6H2v2h8v-2h2v-6h6v2h-2v2h2v-2h2v-2h2V9h-2V7h-2zM2 9h6v2H2zm20 10v-2h-8v2z"
				/></svg
			>
		</button>
		<button class="btn">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path fill="currentColor" d="M6 4h2v16H6zm12 0h-2v2h-2v3h-2v2h-2v2h2v3h2v2h2v2h2z" /></svg
			>
		</button>
		<button class="btn">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><path fill="currentColor" d="M6 4h2v2h2v2h2v2h2v4h-2v2h-2v2H8v2H6zm12 0h-2v16h2z" /></svg
			>
		</button>

		<div id="volume-bar">
			<input
				type="range"
				min="0"
				max="100"
				bind:value={volume.value}
				onchange={handleVolumeChange}
			/>
		</div>
	</section>

	<section>
		<button class="btn !py-0" onclick={openRadioList}>
			{#if playerState.value === YT.PlayerState.PLAYING}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><rect width="2.8" height="12" x="1" y="6" fill="currentColor"
						><animate
							id="svgSpinnersBarsScale0"
							attributeName="y"
							begin="0;svgSpinnersBarsScale1.end-0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="0;svgSpinnersBarsScale1.end-0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					><rect width="2.8" height="12" x="5.8" y="6" fill="currentColor"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScale0.begin+0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="svgSpinnersBarsScale0.begin+0.1s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					><rect width="2.8" height="12" x="10.6" y="6" fill="currentColor"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScale0.begin+0.2s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="svgSpinnersBarsScale0.begin+0.2s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					><rect width="2.8" height="12" x="15.4" y="6" fill="currentColor"
						><animate
							attributeName="y"
							begin="svgSpinnersBarsScale0.begin+0.3s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="svgSpinnersBarsScale0.begin+0.3s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					><rect width="2.8" height="12" x="20.2" y="6" fill="currentColor"
						><animate
							id="svgSpinnersBarsScale1"
							attributeName="y"
							begin="svgSpinnersBarsScale0.begin+0.4s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="6;1;6"
						/><animate
							attributeName="height"
							begin="svgSpinnersBarsScale0.begin+0.4s"
							calcMode="spline"
							dur="0.6s"
							keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
							values="12;22;12"
						/></rect
					></svg
				>
				<span>{activeRadioData.value.title ? activeRadioData.value.title : 'loading...'}</span>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"
						><animate
							id="svgSpinnersBlocksShuffle30"
							fill="freeze"
							attributeName="x"
							begin="0;svgSpinnersBlocksShuffle3b.end"
							dur="0.2s"
							values="1;13"
						/><animate
							id="svgSpinnersBlocksShuffle31"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle38.end"
							dur="0.2s"
							values="1;13"
						/><animate
							id="svgSpinnersBlocksShuffle32"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle39.end"
							dur="0.2s"
							values="13;1"
						/><animate
							id="svgSpinnersBlocksShuffle33"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle3a.end"
							dur="0.2s"
							values="13;1"
						/></rect
					><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"
						><animate
							id="svgSpinnersBlocksShuffle34"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle30.end"
							dur="0.2s"
							values="13;1"
						/><animate
							id="svgSpinnersBlocksShuffle35"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle31.end"
							dur="0.2s"
							values="1;13"
						/><animate
							id="svgSpinnersBlocksShuffle36"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle32.end"
							dur="0.2s"
							values="1;13"
						/><animate
							id="svgSpinnersBlocksShuffle37"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle33.end"
							dur="0.2s"
							values="13;1"
						/></rect
					><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"
						><animate
							id="svgSpinnersBlocksShuffle38"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle34.end"
							dur="0.2s"
							values="13;1"
						/><animate
							id="svgSpinnersBlocksShuffle39"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle35.end"
							dur="0.2s"
							values="13;1"
						/><animate
							id="svgSpinnersBlocksShuffle3a"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle36.end"
							dur="0.2s"
							values="1;13"
						/><animate
							id="svgSpinnersBlocksShuffle3b"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle37.end"
							dur="0.2s"
							values="1;13"
						/></rect
					></svg
				>
				<span>buffering...</span>
			{/if}
		</button>
	</section>
</main>
