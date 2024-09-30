import type { Action } from 'svelte/action';

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
