<script lang="ts">
	export let videoData: VideoData
</script>

<main class="text-[22px]">
	{videoData?.isLive ? 'Live' : 'Offline'}
</main>
