import { browser } from '$app/environment';

class LocalStorage<T> {
	#value = $state<T>() as T;
	key = '';

	constructor(key: string, value: T) {
		this.key = key;
		this.#value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) {
				this.#value = this.deserialize(item);
			} else {
				localStorage.setItem(key, this.serialize(this.#value));
			}
		}
	}

	get value() {
		return this.#value;
	}

	set value(newValue: T) {
		this.#value = newValue;
		if (browser) {
			localStorage.setItem(this.key, this.serialize(this.#value));
		}
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(value: string) {
		return JSON.parse(value);
	}
}

class Writable<T> {
	#value: T = $state<T>() as T;

	constructor(value: T) {
		this.#value = value;
	}

	get value() {
		return this.#value;
	}

	set value(newValue: T) {
		this.#value = newValue;
	}
}

export const playerState = new Writable(1);

export const volume = new LocalStorage<number>('volume', 50);

export const dailyRadios = new Writable<Radio[] | null>(null);

export const favorites = new LocalStorage<string[]>('favorites', [
	'wkhLHTmS_GI',
	'rPjez8z61rI',
	'J4S8iN7qV1k',
	'jfKfPfyJRdk',
	'wkhLHTmS_GI',
	'rPjez8z61rI',
	'J4S8iN7qV1k',
	'jfKfPfyJRdk'
]);

export const activeRadioID = new LocalStorage<string>('activeRadioID', '');

export const activeRadioData = new Writable<VideoData>({} as VideoData);

export const radioListOpen = new Writable(false);

export const playerError = new Writable(false);
