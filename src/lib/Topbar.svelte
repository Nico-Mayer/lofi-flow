<script lang="ts">
	import { videoData } from '$lib/store/store'
</script>

<main class="text-glow">
	{$videoData?.isLive ? 'Live' : 'Video'}
	{$videoData?.author}
	{$videoData?.errorCode}
</main>
