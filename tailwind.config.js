/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-cormorant)", "serif"],
      },
      colors: {
        accent: "#e85d4a",
      },
    },
  },
  plugins: [],
};