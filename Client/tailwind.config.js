/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primaryCol: "#fff6ebab",
        primaryCol: "#ffffff",
        primaryColHover: "#fff6ebab",
        secondaryCol: "#ab5b10bd",
        secondaryColHover: "#c56409bd",
        headingCol: "#864100c9",
        headingColHover: "#b55a04c9",
        paraText: "#4b5563"
      }
    },
  },
  plugins: [],
}
