import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#2563EB",
          deep: "#0F2A5F",
          sky: "#EAF2FF",
          soft: "#D6E7FF",
        },
        orange: {
          accent: "#FF5A2A",
        },
        brand: {
          bg: "#F7F4EF",
          dark: "#0B1220",
          text: "#111827",
          muted: "#5B6472",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
