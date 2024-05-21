/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        bg: {
          section: "#e8e8e8",
        },
        cascade: {
          50: "#d6eeea",
          100: "#cfe8e3",
          500: "#5ba59d",
          600: "#0c8877",
          900: "#147a67",
        },
      },
      backgroundImage: {
        cascade: "url('/bg-pdf.jpeg')",
      },
    },
  },
  plugins: [],
};
