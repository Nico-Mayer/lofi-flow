const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [
		iconsPlugin({
			// Select the icon collections you want to use
			// You can also ignore this option to automatically discover all icon collections you have installed
			collections: getIconCollections(['mdi']),
		}),
	],
}
