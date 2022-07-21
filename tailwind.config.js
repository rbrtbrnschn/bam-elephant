/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0.0deg)' },
          '20%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-8deg)' },
          '65%': { transform: 'rotate(14deg)' },
          '800%': { transform: 'rotate(-4deg)' },
          '100%': {transform: 'rotate(0deg)'}
        },
      },
      animation:{
        'wiggle': 'wiggle 2s linear infinite'
      }
    },
  },
  plugins: [],
}
