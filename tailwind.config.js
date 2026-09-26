/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff1744", // Restrained red accent
        dark: "#0a0a0a", // Near-black base
        gray: {
          100: "#e0e0e0",
          200: "#c6c6c6",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#0f0f0f",
        },
      },
      fontFamily: {
        mono: [" JetBrains Mono", "Fira Code", "Menlo", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: 0.3, transform: "scale(1)" },
          "50%": { opacity: 0.6, transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
}