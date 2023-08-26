/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008BFF",
        warning: "#DB9C01",
      },
    },
  },
  plugins: [require("daisyui")],
};
