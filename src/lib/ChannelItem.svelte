<script lang="ts">
	import { activeChannel, playing } from '$lib/stores/store'

	export let channel: Channel

	$: active = $activeChannel == channel

	function handleChannelChange() {
		$activeChannel = channel
	}
</script>

<button
	class="py-4 text-left flex justify-between items-center rounded group anim text-lg opacity-50 hover:opacity-100"
	class:opacity-80={active}
	on:click={handleChannelChange}>
	<div class="items-center flex">
		<div
			class="i-mdi-audio-input-stereo-minijack text-2xl rotate-90 anim group-hover:ml-2"
			class:ml-2={active}>
		</div>

		<span
			class="whitespace-nowrap truncate ml-4 anim group-hover:ml-2"
			class:ml-2={active}>
			{channel.name}
		</span>
	</div>

	{#if active && $playing}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			><rect width="2.8" height="12" x="1" y="6" fill="currentColor"
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
			><rect width="2.8" height="12" x="5.8" y="6" fill="currentColor"
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
			><rect width="2.8" height="12" x="10.6" y="6" fill="currentColor"
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
			><rect width="2.8" height="12" x="15.4" y="6" fill="currentColor"
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
			><rect width="2.8" height="12" x="20.2" y="6" fill="currentColor"
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
</button>
