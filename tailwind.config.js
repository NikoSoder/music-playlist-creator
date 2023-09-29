/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        blue: "0 0 14px -5px #43b7ff",
      },
      keyframes: {
        appear: {
          "0%": { transform: "scale(0.2)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        below: {
          "0%": {
            opacity: "0",
            transform: "translateY(70px)",
          },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.3)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        appear:
          "appear 700ms 700ms backwards cubic-bezier(0.37, -0.8, 0.26, 1.45)",
        fadeIn: "fadeIn 1s 1s backwards",
        below: "below 1s cubic-bezier(.58, -0.06 ,.3, 1.5)",
        scaleIn: "scaleIn 300ms",
      },
    },
  },
  plugins: [],
};
