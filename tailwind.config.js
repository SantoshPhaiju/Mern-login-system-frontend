/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', serif",
        rotobo: "'Roboto', serif",
        ubuntu: "Ubuntu",
        worksans: "'Work Sans",
        opensans: "Open Sans"
      }
    },
  },
  plugins: [],
}
