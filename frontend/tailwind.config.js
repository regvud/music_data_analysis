/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Purple: {
          500: "#866292",
          300: "#b59ec7",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
