import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { PluginCreator } from "tailwindcss/types/config";

const containerPlugin : PluginCreator = ({ addVariant }) =>{
  addVariant('light', '@media (prefers-color-scheme: light)');
  addVariant('under-md', '@media (max-width: 768px)');
}



const config : Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        height: {
          '128': '32rem',
        },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: '#dc143c',
          100: '#f7cbd4',
	        200: '#f19eaf',
	      	300: '#e96c85',
	      	400: '#df2b4f',
	      	500: '#b11030', // 기준
	      	600: '#7c0b22',
	      	700: '#710a1f',
	      	800: '#67091c',
	      	900: '#5d0819',
        },
        
        light: {
          text: {
            DEFAULT: '#212529',
            1: '#CED4DA',
            2: '#868E96',
            3: '#495057',
          },
        },
        dark: {
          text: {
            DEFAULT: '#ECECEC',
            1: '#D9D9D9',
            2: '#ACACAC',
            3: '#595959',
          },
        },
        
      }
    },
  },
  plugins: [
    plugin(containerPlugin)
  ],
};
export default config;
