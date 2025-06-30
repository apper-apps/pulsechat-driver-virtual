/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#00a884',
          600: '#008069',
          700: '#00695c',
        },
        accent: {
          500: '#25d366',
          600: '#1db954',
        },
        surface: {
          50: '#ffffff',
          100: '#f0f2f5',
          200: '#e4e6ea',
          800: '#3b4a54',
          900: '#2a2f32',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 1.4s linear infinite',
      },
      keyframes: {
        typing: {
          '0%': { opacity: '.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '.2' },
        }
      }
    },
  },
  plugins: [],
}