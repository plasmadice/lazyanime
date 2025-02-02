/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			flamenco: {
  				'50': '#fff8ed',
  				'100': '#ffefd4',
  				'200': '#ffdca8',
  				'300': '#ffc270',
  				'400': '#ff9c37',
  				'500': '#ff7c0a',
  				'600': '#f06306',
  				'700': '#c74a07',
  				'800': '#9e3a0e',
  				'900': '#7f320f',
  				'950': '#451705'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require("tailwindcss-animate")],
}
