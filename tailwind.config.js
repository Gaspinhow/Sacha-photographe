module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { accent: { DEFAULT: "#FF6B6B" }, bg: "#ffffff", fg: "#1a1a1a" },
      transitionTimingFunction: { 'expo': 'cubic-bezier(0.19, 1, 0.22, 1)' }
    },
  },
  plugins: [],
};
