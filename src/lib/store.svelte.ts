import { browser } from '$app/environment';

class LocalStorage<T> {
	#value = $state<T>() as T;
	key = '';

	constructor(key: string, value: T) {
		this.key = key;
		this.#value = value;

		if (browser) {
			const storedItem = this.getStoredValue(key);
			if (storedItem) {
				this.#value = storedItem;
			} else {
				const newValue = this.serialize(this.#value);
				if (newValue !== null) {
					localStorage.setItem(key, newValue);
				}
			}
		}
	}

	get value() {
		return this.#value;
	}

	set value(newValue: T) {
		this.#value = newValue;
		if (browser) {
			const serializedNewValue = this.serialize(this.#value);

			if (serializedNewValue !== null) {
				localStorage.setItem(this.key, serializedNewValue);
			}
		}
	}

	private serialize(value: T): string | null {
		try {
			return JSON.stringify(value);
		} catch (e: unknown) {
			console.error(`error serializing data into local storage (${this.key}): `, e);
			return null;
		}
	}

	private deserialize(value: string): T | null {
		try {
			return JSON.parse(value);
		} catch (e: unknown) {
			console.error(`error deserializing value from local storage (${this.key}):`, e);
			localStorage.removeItem(this.key);
			return null;
		}
	}

	private getStoredValue(key: string): T | null {
		const item = localStorage.getItem(key);

		if (item) {
			return this.deserialize(item);
		}
		return null;
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

type SkipDirection = 'next' | 'prev' | null;

export const playerState = new Writable(1);

export const lastSkipDirection = new Writable<SkipDirection>(null);

export const volume = new LocalStorage<number>('volume', 50);

export const dailyRadios = new Writable<Radio[] | null>(null);

export const favorites = new LocalStorage<Radio[]>('favorites', []);

export const activeRadio = new LocalStorage<Radio | null>('activeRadio', null);

export const radioListOpen = new Writable(false);

export const playerError = new Writable(false);

export const radioSwitching = new Writable(false);

export const lowPowerMode = new LocalStorage<boolean | null>('lowPowerMode', false);
