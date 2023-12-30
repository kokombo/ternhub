import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["outline-purple, text-red, lg:w-[556px] lg:w-[300px]"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      colors: {
        blue: "#2F00D7",
        white: "#FFFFFF",
        grey: "#F0F0F0",
        black: "#0A0A0A",
        textblack: "#141024",
        greyblack: "#3D3D3D",
        lightGrey: "#716F6F",
        purple: "#5627FF",
        green: "#048640",
        deepgreen: "#00632D",
        red: "#CE0A0A",
        modalblack: "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        box: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
      },
      backgroundColor: {
        background: "#EDF2FD",
        black: "#0A0A0A",
      },
      borderColor: {
        grey: "#D4D4D4",
        gray: "#C7C7C7",
      },
      outlineColor: {
        outline: "#5627FF",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
export default config;
