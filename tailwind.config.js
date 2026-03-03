/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f7',
          100: '#ffe3ef',
          200: '#ffc2de',
          300: '#ff97c7',
          400: '#ff62aa',
          500: '#EE5A98',
          600: '#d83d81',
          700: '#b02a64',
          800: '#8f2556',
          900: '#7a234f',
          950: '#4b0f2b',
        },
      },
      boxShadow: {
        glow: '0 0 0 4px rgba(238, 90, 152, 0.18)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

