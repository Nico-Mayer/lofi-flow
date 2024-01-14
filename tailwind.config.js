/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				glow: 'glow 3s ease-in-out infinite',
			},
			keyframes: {
				glow: {
					'0%, 100%': { "box-shadow": '0px 0px 10px #99ff99' },
					'50%': { "box-shadow": '0px 0px 20px #99ff99' },
				},
			},
		},
	},
	plugins: [],
}

