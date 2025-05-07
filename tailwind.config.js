/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#7F9CF5",
          DEFAULT: "#667EEA",
          dark: "#5A67D8",
        },
        secondary: {
          light: "#F6AD55",
          DEFAULT: "#ED8936",
          dark: "#DD6B20",
        },
        accent: "#F56565",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      borderRadius: {
        lg: "1rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
