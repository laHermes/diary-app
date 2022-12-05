/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./features/**/*.{js,ts,jsx,tsx}',
		'./styles/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: ['class', '[data-mode="dark"]'],

	plugins: [
		require('flowbite/plugin'),
		require('@tailwindcss/typography'),
		require('prettier-plugin-tailwindcss'),
		require('@tailwindcss/line-clamp'),
	],
	theme: {
		extend: {
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				jost: ['Jost', 'sans serif'],
				noto: ['Noto Sans Mono', 'monospace'],
			},
			colors: {
				backgroundLight: '#fffefc',
				primary: '#BB86FC',
				primaryVar: '#3700B3',
				secondary: '#03DAC6',
				cardDark: '#101010',
				darkButtonHover: '#191919',
				accent: '#795c85',
			},
		},
	},
};
