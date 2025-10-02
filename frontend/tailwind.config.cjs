// SPDX-FileCopyrightText: 2023 Marlon W (Mawoka)
//
// SPDX-License-Identifier: MPL-2.0

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a'
				},
				secondary: {
					50: '#faf5ff',
					100: '#f3e8ff',
					200: '#e9d5ff',
					300: '#d8b4fe',
					400: '#c084fc',
					500: '#a855f7',
					600: '#9333ea',
					700: '#7c3aed',
					800: '#6b21a8',
					900: '#581c87'
				}
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						// color: theme('colors.yellow.50'),
						textDecoration: 'none',
						textColor: '#000',
						/*a: {
							color: theme('colors.blue.200')
						},
						blockquote: {
							color: theme('colors.yellow.50')
						},
						h1: {
							color: theme('colors.yellow.50')
						},
						h2: {
							color: theme('colors.yellow.50')
						},
						h3: {
							color: theme('colors.yellow.50')
						},
						h4: {
							color: theme('colors.yellow.50')
						},
						th: {
							color: theme('colors.yellow.50')
						},
						strong: {
							color: theme('colors.yellow.50')
						},*/
						'code::before': {
							content: '""',
							'padding-left': '0.25rem'
						},
						'code::after': {
							content: '""',
							'padding-right': '0.25rem'
						},
						code: {
							'padding-top': '0.25rem',
							'padding-bottom': '0.25rem',
							fontWeight: '400',
							color: theme('colors.gray.100'),
							'border-radius': '0.25rem',
							backgroundColor: theme('colors.slate.800')
						}
					}
				}
			})
		}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
