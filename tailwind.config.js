/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        black: "#212529",
        "main-background": "rgba(var(--background))",
        "card-background": "rgba(var(--card-background))",
        "dashboard-block": "rgba(var(--dashboard-block))",
        dark: "rgba(var(--dark))",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
  ],
};
