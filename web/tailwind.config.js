/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("./tailwind-preset.js")],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
