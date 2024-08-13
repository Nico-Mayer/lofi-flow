export function clamp(value: number, minValue: number, maxValue: number): number {
	if (value < minValue) {
		return minValue;
	} else if (value > maxValue) {
		return maxValue;
	} else {
		return value;
	}
}

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export function clickOutside(node: HTMLElement, cb: Function) {
	function onClick(event: MouseEvent) {
		if (!node.contains(event.target as Node)) {
			cb();
		}
	}

	document.addEventListener('click', onClick);
	return {
		update(newCb: Function) {
			cb = newCb;
		},
		destroy() {
			document.removeEventListener('click', onClick);
		}
	};
}
