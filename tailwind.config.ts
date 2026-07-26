import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Wired up in app/layout.tsx via next/font CSS variables.
        sans: ["var(--font-tajawal)", "system-ui", "sans-serif"],
        display: ["var(--font-cairo)", "var(--font-tajawal)", "system-ui", "sans-serif"],
      },
      colors: {
        // Warm, calm heritage palette (soft cream/beige + terracotta accent).
        cream: {
          50: "#fdfbf7",
          100: "#faf5ec",
          200: "#f3e9d7",
          300: "#e9d9bd",
        },
        clay: {
          // terracotta accent
          400: "#d69368",
          500: "#c1734a",
          600: "#a95c37",
          700: "#8a4a2c",
        },
        olive: {
          500: "#7a7c4b",
          600: "#63653c",
        },
        ink: {
          // warm dark tones for text / dark mode surfaces
          700: "#3a332c",
          800: "#2a251f",
          900: "#1c1915",
          950: "#141210",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(60,45,30,0.04), 0 8px 24px -12px rgba(60,45,30,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
