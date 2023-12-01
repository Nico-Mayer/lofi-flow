export function extractIDfromYTUrl(url: string) {
	const regex =
		/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
	const match = url.match(regex)
	if (match) {
		return match[1]
	}
	return ''
}
