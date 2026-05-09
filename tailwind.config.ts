import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "479px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        wf: {
          blue: "#146ef5",
          "blue-400": "#3b89ff",
          "blue-300": "#006acc",
          purple: "#7a3dff",
          pink: "#ed52cb",
          green: "#00d722",
          orange: "#ff6b00",
          yellow: "#ffae13",
          red: "#ee1d36",
        },
        ink: "#080808",
        canvas: "#ffffff",
        "canvas-mute": "#f4f4f4",
        "gray-line": "#d8d8d8",
      },
      fontFamily: {
        sans: ['"General Sans"', "Inter", "system-ui", "Arial", "sans-serif"],
        mono: ["Inconsolata", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "wf-sm": "2px",
        wf: "4px",
        "wf-md": "8px",
      },
      boxShadow: {
        "wf-card":
          "rgba(0,0,0,0) 0px 84px 24px, rgba(0,0,0,0.01) 0px 54px 22px, rgba(0,0,0,0.04) 0px 30px 18px, rgba(0,0,0,0.08) 0px 13px 13px, rgba(0,0,0,0.09) 0px 3px 7px",
        "wf-soft":
          "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "grad-primary":
          "linear-gradient(135deg, #146ef5 0%, #4b5dff 50%, #7a3dff 100%)",
        "grad-text": "linear-gradient(120deg, #146ef5 0%, #7a3dff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
