module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#4C1D95",
        accent: "#F59E0B",
        background: "#F9FAFB",
        ink: "#0F172A"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 10px 30px -15px rgba(17, 24, 39, 0.2)"
      }
    },
  },
  plugins: [],
};
