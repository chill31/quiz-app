import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: "3.8rem",
        h2: "3rem",
        h3: "2.3rem",
      },
      colors: {
        'bg': '#1C2124',
      },
      screens: {
        'dt': "1000px"
      }
    },

  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
