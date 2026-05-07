/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
      colors: {
        pearl: "#f7f4ef",
        sand: "#eadfce",
        dusk: "#0d1b24",
        slate: "#1e3642",
        aqua: "#8ed8dc",
        blush: "#f3c8cb",
        mint: "#b9f0dd",
        gold: "#d8bd84",
      },
      boxShadow: {
        halo: "0 24px 80px rgba(73, 136, 148, 0.22)",
        glass: "0 16px 48px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "aura-light":
          "radial-gradient(circle at top left, rgba(142, 216, 220, 0.42), transparent 40%), radial-gradient(circle at bottom right, rgba(243, 200, 203, 0.28), transparent 34%), linear-gradient(135deg, #f7f4ef 0%, #eef6f5 46%, #f3efe9 100%)",
        "aura-dark":
          "radial-gradient(circle at top left, rgba(142, 216, 220, 0.18), transparent 38%), radial-gradient(circle at bottom right, rgba(216, 189, 132, 0.12), transparent 26%), linear-gradient(135deg, #081219 0%, #102631 44%, #162f3b 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.88)", opacity: 0.15 },
          "70%": { transform: "scale(1.1)", opacity: 0.55 },
          "100%": { transform: "scale(1.18)", opacity: 0 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "pulse-ring": "pulseRing 2.8s ease-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};
