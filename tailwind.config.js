/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        paper: '#FFFFFF',
        accent: '#D5F74C',
        stone: '#888888',
        charcoal: '#111111',
        smoke: '#F5F5F4',
      },
      fontFamily: {
        heading: ['Inter Tight', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '30px',
      },
    },
  },
  plugins: [],
}
