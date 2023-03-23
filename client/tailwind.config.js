/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter var, sans-serif",
        { fontFeatureSettings: '"cv11", "ss01"' },
      ],
    },
    extend: {
      colors: {
        bruss: "#8bb63b",
      },
    },
  },
  plugins: [],
};
