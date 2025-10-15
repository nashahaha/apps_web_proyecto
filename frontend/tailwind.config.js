/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
            fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Lobster", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        chamo: {
          primary: "#6D28D9",
          "primary-content": "#FFFFFF",
          secondary: "#22C55E",
          "secondary-content": "#05240F",
          accent: "#F59E0B",
          "accent-content": "#1B1303",
          "base-100": "#0B0B0E",
          "base-200": "#111114",
          "base-300": "#1A1A20",
          "base-content": "#ECEDEE",
          neutral: "#15161A",
          "neutral-content": "#C9CBD1",
          info: "#38BDF8",
          success: "#10B981",
          warning: "#FBBF24",
          error: "#EF4444",
        },
      },
      {
        chamoLight: {
          primary: "#7C3AED",
          "primary-content": "#FFFFFF",
          secondary: "#16A34A",
          "secondary-content": "#05240F",
          accent: "#D97706",
          "accent-content": "#1A1202",
          "base-100": "#F8FAFC",
          "base-200": "#EEF2F7",
          "base-300": "#E2E8F0",
          "base-content": "#0B1220",
          neutral: "#0F172A",
          "neutral-content": "#E2E8F0",
          info: "#0284C7",
          success: "#059669",
          warning: "#D97706",
          error: "#DC2626",
        },
      },
    ],
  },
};