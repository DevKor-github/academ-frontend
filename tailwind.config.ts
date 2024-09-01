import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { PluginCreator } from 'tailwindcss/types/config';

const containerPlugin: PluginCreator = ({ addVariant }) => {
  addVariant('light', '@media (prefers-color-scheme: light)');
  addVariant('under-md', '@media (max-width: 768px)');
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      height: {
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
          fore: {
            DEFAULT: '#000000',
            0: '#000000',
            1: '#080808',
            2: '#101010',
            3: '#181818',
            4: '#202020',
            5: '#282828',
            6: '#303030',
            7: '#383838',
            8: '#404040',
            9: '#484848',
            10: '#505050',
            11: '#585858',
            12: '#606060',
            13: '#686868',
            14: '#707070',
            15: '#787878',
            16: '#808080',
          },
          back: {
            DEFAULT: '#FFFFFF',
            16: '#808080',
            15: '#888888',
            14: '#909090',
            13: '#989898',
            12: '#A0A0A0',
            11: '#A8A8A8',
            10: '#B0B0B0',
            9: '#B8B8B8',
            8: '#C0C0C0',
            7: '#C8C8C8',
            6: '#D0D0D0',
            5: '#D8D8D8',
            4: '#E0E0E0',
            3: '#E8E8E8',
            2: '#F0F0F0',
            1: '#F8F8F8',
            0: '#FFFFFF',
          },
        },
        dark: {
          back: {
            DEFAULT: '#000000',
            0: '#000000',
            1: '#080808',
            2: '#101010',
            3: '#181818',
            4: '#202020',
            5: '#282828',
            6: '#303030',
            7: '#383838',
            8: '#404040',
            9: '#484848',
            10: '#505050',
            11: '#585858',
            12: '#606060',
            13: '#686868',
            14: '#707070',
            15: '#787878',
            16: '#808080',
          },
          fore: {
            DEFAULT: '#FFFFFF',
            16: '#808080',
            15: '#888888',
            14: '#909090',
            13: '#989898',
            12: '#A0A0A0',
            11: '#A8A8A8',
            10: '#B0B0B0',
            9: '#B8B8B8',
            8: '#C0C0C0',
            7: '#C8C8C8',
            6: '#D0D0D0',
            5: '#D8D8D8',
            4: '#E0E0E0',
            3: '#E8E8E8',
            2: '#F0F0F0',
            1: '#F8F8F8',
            0: '#FFFFFF',
          },
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.8)', opacity: '0.8' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        shake: 'shake 0.6s ease-in-out infinite',
        pulse: 'pulse 0.8s ease-in-out infinite',
        fade: 'fadeIn 0.2s ease-in-out',
      },
      screens: {
        'not-md': { max: '768px' },
      },
    },
  },
  plugins: [plugin(containerPlugin)],
};
export default config;
