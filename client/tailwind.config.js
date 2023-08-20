/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows:{
        'divForm': '0.5fr 1fr 1fr',
        'divDesImg': '0.3fr 1fr 0.2fr' 
      },
      colors:{
        'fondoDark': '#111827'
      },
      fontFamily:{
        'bungee': ['Bungee Shade', 'cursive']
      }

    },
  },
  plugins: [],
}

