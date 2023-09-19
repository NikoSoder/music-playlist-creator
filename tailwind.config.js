/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        blue: "0 0 14px -5px #43b7ff",
      },
    },
  },
  plugins: [],
};
