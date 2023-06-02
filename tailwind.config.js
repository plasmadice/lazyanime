/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'flamenco': { // https://uicolors.app/create
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
          '950': '#451705',
      },
      
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
