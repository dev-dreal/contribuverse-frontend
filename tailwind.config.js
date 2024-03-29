/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      jacques: ['"Jacques Francois"', "sans-serif"],
      istokWeb: ['"Istok Web"', "sans-serif"],
      irishGrover: ['"Irish Grover"', "sans-serif"],
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      sxl: "1200px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: {
        arc1: "url('./assets/svgs/arc-1.svg')",
        arc2: "url('./assets/svgs/arc-2.svg')",
        arc3: "url('./assets/svgs/arc-3.svg')",
        arc4: "url('./assets/svgs/arc-4.svg')",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 20px 5px var(--tw-shadow-color)",
        lg: "20px 12px 10px var(--tw-shadow-color)",
      },
      colors: {
        primaryBlue: "rgb(4, 165, 187)",
        secondaryBlue: "rgb(5, 136, 144)",
        tertiaryBlue: "rgb(4, 117, 123)",
        darkBlue: "rgb(3, 94, 99)",
        darkerBlue: "rgb(10, 35, 36)",
        gold: "rgb(179, 152, 0)",
        cbWhite: "#D9D9D9",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
