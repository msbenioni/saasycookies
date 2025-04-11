/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        primary: '#A78BFA',
        secondary: '#34D399',
        highlight: '#F9A8D4',
        text: {
          primary: '#1E293B',
          secondary: '#64748B',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'Nunito', 'sans-serif'],
        body: ['Inter', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
