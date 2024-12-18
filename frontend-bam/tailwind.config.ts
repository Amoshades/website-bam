import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'line-Thin': ['LINESeed_Thin', 'sans-serif'],
      'line-Regular': ['LINESeed_Regular', 'sans-serif'],
      'line-bold': ['LINESeed_Bold', 'sans-serif'],
      'line-ExtraBold': ['LINESeed_ExtraBold', 'sans-serif'],
      'line-Hevy': ['LINESeed_Hevy', 'sans-serif'],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'main-color': '#004C85',
        'button': '#F8E47D',
        'fav-btn': '#FF2A2A',
        'stroke': '#AEABAB',
        'btn-bg': '#F6F6F6',
        'details-search': '#555555',
        'main_black': '#1E1E1E',
      },
      backgroundImage: {
        'living-bg': "url('/png/living_room.png')",
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#004C85",
          "secondary": "#F8E47D",
          "accent": "#FF2A2A",
          "neutral": "#AEABAB",
          "base-100": "#ffffff",
          "info": "#37cdbe",
          "success": "#36d399",
          "warning": "#f6d860",
          "error": "#f87272",
        },
      },
      "dark", // Default dark theme from daisyUI
      "cupcake", // Default cupcake theme from daisyUI
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
