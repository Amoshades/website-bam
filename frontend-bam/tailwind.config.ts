import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
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
  plugins: [
    require('daisyui'),
  ],
};
export default config;
