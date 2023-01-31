const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-montserrat)", ...fontFamily.sans],
        heading: ["var(--font-quicksand)", ...fontFamily.serif],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
    hljs: {
      theme: "night-owl",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-highlightjs"),
  ],
};
