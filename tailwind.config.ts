import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#f3efe6",
          2: "#ebe5d6",
        },
        paper: "#faf7ef",
        ink: {
          DEFAULT: "#171612",
          2: "#3a3730",
          light: "#1f1d18",
          border: "#2b2823",
          rule: "#3a3528",
        },
        muted: "#6b6759",
        rule: {
          DEFAULT: "#cfc8b6",
          soft: "#ddd6c4",
        },
        accent: {
          DEFAULT: "#2f4a36",
          2: "#506b4d",
        },
        gold: {
          DEFAULT: "#8a6d3a",
          warm: "#d9c89b",
          text: "#c5bda1",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["9px", { lineHeight: "1.4" }],
        "3xs": ["8px", { lineHeight: "1.4" }],
      },
      maxWidth: {
        site: "1320px",
      },
      padding: {
        site: "48px",
        "site-sm": "24px",
      },
      letterSpacing: {
        widest2: "0.16em",
        widest3: "0.18em",
        "wide-2": "0.12em",
        "wide-1": "0.08em",
      },
      gridTemplateColumns: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-7": "span 7 / span 7",
        "span-5": "span 5 / span 5",
        "span-4": "span 4 / span 4",
        "span-6": "span 6 / span 6",
      },
      gridRow: {
        "span-4": "span 4 / span 4",
        "span-3": "span 3 / span 3",
        "span-2": "span 2 / span 2",
      },
      aspectRatio: {
        "21/9": "21 / 9",
        "16/10": "16 / 10",
        "16/11": "16 / 11",
        "4/3": "4 / 3",
        "3/4": "3 / 4",
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        kenburns: {
          "0%": { transform: "scale(1.02) translate(0, 0)" },
          "100%": { transform: "scale(1.10) translate(-1.5%, -1%)" },
        },
        pulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(217, 200, 155, 0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(217, 200, 155, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(217, 200, 155, 0)" },
        },
      },
      animation: {
        scroll: "scroll 60s linear infinite",
        kenburns: "kenburns 32s ease-in-out infinite alternate",
        "live-pulse": "pulse 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
