/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // lo dejamos por si usas tema oscuro luego
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        brand: {
          cinnamon: "#8C4A2F",
          cinnamon700: "#733E27",
          cream: "#F6E6DA",
          ink: "#1F2937",
          gold: "#B45309"
        }
      },
      fontFamily: {
        serifBrand: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      },
      boxShadow: {
        menucard: "0 12px 40px -16px rgba(0,0,0,.25)",
        soft: "0 8px 24px -12px rgba(0,0,0,.20)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
