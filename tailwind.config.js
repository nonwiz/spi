module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors: {
        "primary-color": "#0070F3",
        'error-color': "#FF0080",
        'primary': "#0369a1",
        'secondary': "#38bdf8",
        'dark': "#3F3F46",
        'mid': "#A1A1AA",
        'light': "#F1F3F4",
        transparent: 'transparent',
        current: 'currentColor',
      },
    },
  
    fontFamily: {
      Inter :['Inter', 'sans-serif'],
    },
  },
  plugins: [],
}
