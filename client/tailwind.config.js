/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows:{
        'divForm': '0.5fr 1fr 1fr',
        'divDesImg': '0.2fr 2fr 0.2fr',
        'divDesModal': '0.5fr 1fr 0.5fr',
        'divImgEdit' : '0.2fr 1fr 0,2fr'
      },
      colors:{
        'fondoDark': '#111827',
        'fondoModal' : 'rgba(0, 0, 0, 0.752)'
      },
      fontFamily:{
        'bungee': ['Bungee Shade', 'cursive']
      },
      gridTemplateColumns: {
        'slider' : '0.2fr 2fr 0.2fr'
      }

    },
  },
  plugins: [],
}

