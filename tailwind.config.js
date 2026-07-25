/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0b080c',
        light: '#EAE5EC',
        muted: '#ADACAC',
        primary: 'rgba(var(--color-primary))',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
