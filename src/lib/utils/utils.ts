export function clickOutside(node: HTMLElement, cb: Function) {
	function onClick(event: MouseEvent) {
		if (!node.contains(event.target as Node)) {
			cb()
		}
	}

	document.addEventListener('click', onClick)
	return {
		update(newCb: Function) {
			cb = newCb
		},
		destroy() {
			document.removeEventListener('click', onClick)
		},
	}
}
