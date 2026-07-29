/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Sesuaikan dengan struktur folder proyekmu
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#041322',
        'secondary': '#3CCBFF',
        'third': '#ADDFF1'
      }
    },
  },
  plugins: [],
}
