<script lang="ts">
	type Props = {
		id: string;
		onclick: (id: string) => void;
	};

	let { id, onclick }: Props = $props();

	let mouseInside = $state(false);
</script>

<button
	class="group relative flex h-full w-full flex-col p-2"
	onclick={() => onclick(id)}
	onmouseenter={() => (mouseInside = true)}
	onmouseleave={() => (mouseInside = false)}
>
	<img
		draggable="false"
		class="h-full max-h-96 w-full object-cover"
		src={`http://img.youtube.com/vi/${id}/mqdefault.jpg`}
		alt="channel-thumbnail"
	/>

	<span>{id}</span>
</button>

<!-- <style>
	.highlight {
		animation: glow 3s ease-in-out infinite;
	}

	.active {
		border: 1px solid #99ff99;
		animation: glow 3s ease-in-out infinite;
	}

	@keyframes glow {
		0% {
			box-shadow: 0px 0px 10px #99ff99;
		}
		50% {
			box-shadow: 0px 0px 20px #99ff99;
		}
		100% {
			box-shadow: 0px 0px 10px #99ff99;
		}
	}
</style> -->
