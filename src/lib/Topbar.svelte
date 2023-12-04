<script lang="ts">
	export let videoData: VideoData
</script>

<main class="glowing-text">
	{videoData?.isLive ? 'Live' : 'Video'}
	{videoData?.errorCode}
</main>
