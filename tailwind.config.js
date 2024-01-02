/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 20px 5px var(--tw-shadow-color)",
        lg: "20px 12px 10px var(--tw-shadow-color)",
      },
      colors: {
        primaryBlue: "rgba(4, 165, 187)",
        loaderBlue: "rgba(6, 159, 169, 1);",
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
        { values: theme("textShadow") }
      );
    }),
  ],
};
