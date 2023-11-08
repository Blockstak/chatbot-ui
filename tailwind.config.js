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
          950: "#121212",
        },
      },

      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
