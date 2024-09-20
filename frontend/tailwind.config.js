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
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    }
  },
  plugins: [],
}

