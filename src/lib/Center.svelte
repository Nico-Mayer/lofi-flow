<script lang="ts">
	import { playing, buffering } from '$lib/stores/store'
	import { fly } from 'svelte/transition'
</script>

<div class="right-side h-full w-full flex flex-col justify-between p-10 pl-0">
	<div class="flex h-full w-full justify-center items-center relative">
		{#if $buffering}
			<div class="flex justify-center items-center gap-4 text-4xl">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					><rect
						width="10"
						height="10"
						x="1"
						y="1"
						fill="currentColor"
						rx="1"
						><animate
							id="svgSpinnersBlocksShuffle30"
							fill="freeze"
							attributeName="x"
							begin="0;svgSpinnersBlocksShuffle3b.end"
							dur="0.1s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle31"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle38.end"
							dur="0.1s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle32"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle39.end"
							dur="0.1s"
							values="13;1" /><animate
							id="svgSpinnersBlocksShuffle33"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle3a.end"
							dur="0.1s"
							values="13;1" /></rect
					><rect
						width="10"
						height="10"
						x="1"
						y="13"
						fill="currentColor"
						rx="1"
						><animate
							id="svgSpinnersBlocksShuffle34"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle30.end"
							dur="0.1s"
							values="13;1" /><animate
							id="svgSpinnersBlocksShuffle35"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle31.end"
							dur="0.1s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle36"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle32.end"
							dur="0.1s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle37"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle33.end"
							dur="0.1s"
							values="13;1" /></rect
					><rect
						width="10"
						height="10"
						x="13"
						y="13"
						fill="currentColor"
						rx="1"
						><animate
							id="svgSpinnersBlocksShuffle38"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle34.end"
							dur="0.1s"
							values="13;1" /><animate
							id="svgSpinnersBlocksShuffle39"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle35.end"
							dur="0.1s"
							values="13;1" /><animate
							id="svgSpinnersBlocksShuffle3a"
							fill="freeze"
							attributeName="x"
							begin="svgSpinnersBlocksShuffle36.end"
							dur="0.1s"
							values="1;13" /><animate
							id="svgSpinnersBlocksShuffle3b"
							fill="freeze"
							attributeName="y"
							begin="svgSpinnersBlocksShuffle37.end"
							dur="0.1s"
							values="1;13" /></rect
					></svg>
				<span class="tracking-widest">Buffering</span>
			</div>
		{/if}

		{#if $playing}
			<div
				in:fly={{ x: 1000, duration: 5000 }}
				out:fly={{ x: 1000, duration: 1000 }}
				class="absolute bottom-10 right-0 p-4 border border-white/10 rounded">
				<span class="heading">Name</span>
			</div>
		{/if}
	</div>
</div>
