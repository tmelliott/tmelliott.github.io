const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", ...fontFamily.sans],
        heading: ["var(--font-quicksand)", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};

module.exports = config;
