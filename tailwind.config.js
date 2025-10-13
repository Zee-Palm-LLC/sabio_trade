/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        'navy': {
          '900': '#031340',
          '800': '#0A1A4A',
          '700': '#1A2A5A',
        },
        'teal': {
          '600': '#008080',
          '700': '#004D4D',
          '500': '#20B2AA',
        }
      }
    },
  },
  plugins: [],
}
