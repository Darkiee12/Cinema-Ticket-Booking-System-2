const { keyframes } = require('@emotion/react')
const { transform } = require('typescript')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ring: {
          '0%': {
            transform: 'rotate(0deg)',
            'box-shadow': '1px 3px 1px 0 rgba(230, 92, 0, 1)',
          },
          '50%': {
            transform: 'rotate(180deg)',
            'box-shadow': '1px 3px 1px 0 rgba(32, 160, 254, 1)',
          },
          '100%': {
            transform: 'rotate(360deg)',
            'box-shadow': '1px 3px 1px 0 rgba(190, 32, 254, 1)',
          }
        },
        text: {
          color: '#ffffff',
        }
      },
      animation: {
        'loading': 'ring 2s linear infinite',
        'loading-text': 'text 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

