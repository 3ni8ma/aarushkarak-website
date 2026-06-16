/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0A0A0A',
        'dark-card': '#151515',
        primary: '#D946EF',
        secondary: '#6366F1',
        accent: '#22D3EE',
        light: '#FFFFFF',
        muted: '#A1A1AA',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'orb': 'orb 8s ease-in-out infinite',
        'border-spin': 'border-spin 3s linear infinite',
        'float-3d': 'float-3d 4s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'ken-burns': 'ken-burns 15s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(217,70,239,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(217,70,239,0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        orb: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
}
