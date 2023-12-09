export function rnd(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
export function stripFormatting(s: string): string {
	if (!s) return ''
	return s.replace(/[^a-zA-Z0-9 ]/g, '')
}
