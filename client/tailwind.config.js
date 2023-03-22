/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {},
  theme: {
  },
  plugins: [require("daisyui")],
};
