export function clamp(value: number, minValue: number, maxValue: number): number {
	if (value < minValue) {
		return minValue;
	} else if (value > maxValue) {
		return maxValue;
	} else {
		return value;
	}
}
