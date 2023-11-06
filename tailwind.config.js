/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/comps/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#F1ECFF",
          500: "#4E31AA",
          600: "#2F1D66",
        },
        "daisy-bush": {
          50: "#eeefff",
          100: "#e0e1ff",
          200: "#c7c8fe",
          300: "#a4a4fd",
          400: "#8b80f9",
          500: "#7962f2",
          600: "#6b45e6",
          700: "#5c37cb",
          800: "#4e31aa",
          900: "#3f2d82",
          950: "#271b4b",
        },
        neutral: {
          ...colors.neutral,
          200: "#F4F4F4",
          700: "#575959",
          800: "#272727",
          900: "#191919",
        },
      },

      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
