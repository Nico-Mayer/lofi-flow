import type { Action } from 'svelte/action';

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
