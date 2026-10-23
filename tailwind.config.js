/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        ivory: {
          50: '#FDFCFA',
          100: '#FBF9F5',
          200: '#F5F0E8',
          300: '#EFE7DA',
        },
        champagne: {
          DEFAULT: '#F5F0E8',
          light: '#FAF7F2',
          gold: '#C8AE83',
          'gold-dark': '#A38456',
          'gold-light': '#DDCBB0',
          border: '#E6D8C1',
        },
        ink: {
          DEFAULT: '#302B27',
          light: '#4A433D',
          muted: '#817970',
          faint: '#A69E96',
        },
        botanical: {
          DEFAULT: '#DCE1D7',
          soft: '#EAF0E6',
          dark: '#7D8B78',
        }
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'stationery': '0 4px 20px -2px rgba(48, 43, 39, 0.05), 0 2px 6px -1px rgba(48, 43, 39, 0.03)',
        'stationery-lg': '0 10px 35px -5px rgba(48, 43, 39, 0.08), 0 4px 12px -2px rgba(48, 43, 39, 0.04)',
        'gold-glow': '0 0 25px rgba(200, 174, 131, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spinSlow 16s linear infinite',
      }
    },
  },
  plugins: [],
}
