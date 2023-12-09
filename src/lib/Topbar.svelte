<script lang="ts">
	import { videoData } from '$lib/store/store'
</script>

<main class="glowing-text">
	{$videoData?.isLive ? 'Live' : 'Video'}
	{$videoData?.author}
	{$videoData?.errorCode}
</main>
