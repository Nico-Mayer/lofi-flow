import type { Action } from 'svelte/action';

type PlayerState = 'unstated' | 'ended' | 'playing' | 'paused' | 'buffering' | 'video cued';

export function clamp(value: number, minValue: number, maxValue: number): number {
	if (value < minValue) {
		return minValue;
	} else if (value > maxValue) {
		return maxValue;
	} else {
		return value;
	}
}

export function clickOutside(node: HTMLElement, cb: () => void) {
	function onClick(event: MouseEvent) {
		if (!node.contains(event.target as Node)) {
			cb();
		}
	}

	document.addEventListener('click', onClick);
	return {
		update(newCb: () => void) {
			cb = newCb;
		},
		destroy() {
			document.removeEventListener('click', onClick);
		}
	};
}

export const inlineSvg: Action<SVGSVGElement, string> = (node, url) => {
	async function op() {
		if (url) {
			const response = await fetch(url);
			const str = await response.text();
			const svg = new DOMParser().parseFromString(str, 'image/svg+xml').documentElement;
			for (let i = 0; i < svg.attributes.length; i++) {
				const attr = svg.attributes[i];

				node.setAttribute(attr.name, attr.value);
			}

			node.setAttribute('width', node.getAttribute('width') || '');
			node.setAttribute('height', node.getAttribute('height') || '');

			node.innerHTML = svg.innerHTML;
		}
	}
	op();
	return {
		update() {
			op();
		}
	};
};

export function ytPlayerStateCode(state: PlayerState): number {
	switch (state) {
		case 'unstated':
			return -1;
		case 'ended':
			return 0;
		case 'playing':
			return 1;
		case 'paused':
			return 2;
		case 'buffering':
			return 3;
		case 'video cued':
			return 5;
	}
	return -1;
}
