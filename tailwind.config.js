/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#66B4C1',
        'secondary':'#94B9C7',
        'accent': '#2A5594'
      }
    },
  },
  plugins: [],
};
