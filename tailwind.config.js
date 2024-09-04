/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mountain': ['Poppins', 'sans-serif'],  // Add custom font
      },
      backdropBlur: {
        'md': '5px',
      },
      colors: {
        'primary': '#1D4ED8',  // Example primary color
      },
    },
  },
  plugins: [],
}

