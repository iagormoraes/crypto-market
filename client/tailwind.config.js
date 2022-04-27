const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/commons/components/**/*.{js,ts,jsx,tsx}',
    './src/commons/containers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      primary: ['Inter', 'Arial', 'sans-serif'],
      secondary: ['Lora', 'Times New Roman', 'Times', 'serif'],
    },
    extend: {},
  },
  plugins: ['tailwindcss', 'autoprefixer', 'postcss'],
};
