import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        text: {
          primary: "var(--text-primary)",
          body: "var(--text-body)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          brand: "var(--text-brand)",
          interactive: {
            button: "var(--text-button)",
            disabled: "var(--text-disabled)",
            warning: "var(--text-interactive-warning)",
            active: "var(--text-interactive-active)",
            error: "var(--text-interactive-error)",
            valid: "var(--text-interactive-valid)",
          },
        },
        border: {
          DEFAULT: "var(--border-base)",
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          interactive: {
            hover: "var(--border-interactive-hover)",
            selected: "var(--border-interactive-selected)",
            focus: "var(--border-interactive-focus)",
            disabled: "var(--border-interactive-disabled)",
            active: "var(--border-interactive-active)",
            error: "var(--border-interactive-error)",
            valid: "var(--border-interactive-valid)",
          },
        },
        background: {
          DEFAULT: "var(--background)",
          primary: "var(--background-primary)",
          secondary: "var(--background-secondary)",
          tertiary: "var(--background-tertiary)",
          brand: "var(--background-brand)",
          button: "var(--background-button)",
          interactive: {
            hover: "var(--background-interactive-hover)",
            selected: "var(--background-interactive-selected)",
            pressed: "var(--background-interactive-pressed)",
            disabled: "var(--background-interactive-disabled)",
            active: "var(--background-interactive-active)",
            error: "var(--background-interactive-error)",
            warning: "var(--background-interactive-warning)",
            valid: "var(--background-interactive-valid)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
