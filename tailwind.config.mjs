const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        DEFAULT: "80rem",
      },
    },
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        text: "hsl(var(--text))",
        background: "hsl(var(--background))",
      },
      fontFamily: {
        sans: ["Geist", ...defaultTheme.fontFamily.sans],
        mono: ["GeistMono", ...defaultTheme.fontFamily.mono],
        secondary: ["Virgil", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
