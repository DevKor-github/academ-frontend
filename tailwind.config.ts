import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { PluginCreator } from 'tailwindcss/types/config';

const containerPlugin: PluginCreator = ({ addVariant }) => {
  // addVariant('light', '@media (prefers-color-scheme: light)');
  addVariant('light', '@media all'); // TODO : remove this when turn on dark mode
  addVariant('under-md', '@media (max-width: 768px)');
};

const animationDelayPlugin: PluginCreator = ({ matchUtilities }) => {
  // Custom utility for animation delay
  matchUtilities(
    {
      'animate-pulse': (value) => ({
        animation: 'pulse .75s ease-in-out infinite',
        'animation-delay': value, // Add arbitrary delay value
      }),
      'animate-fade': (value) => ({
        animation: 'fadeIn 0.6s ease-in-out',
        'animation-delay': value, // Add arbitrary delay value
      }),
    },
    {
      values: {},
      supportsNegativeValues: true,
    },
  );
};

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/markdown/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // set 'media' to turn on : TODO: edit addVariant('light', ...) also
  theme: {
    extend: {
      height: {
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-md': '0px 0px 8px rgba(0 0 0 / 0.1)',
        'glow-lg': '0px 0px 16px rgba(0 0 0 / 0.1)',
        'glow-xl': '0px 0px 32px rgba(0 0 0 / 0.1)',
        'glow-2xl': '0px 0px 64px rgba(0 0 0 / 0.1)',
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
        base: {
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
          17: '#888888',
          18: '#909090',
          19: '#989898',
          20: '#A0A0A0',
          21: '#A8A8A8',
          22: '#B0B0B0',
          23: '#B8B8B8',
          24: '#C0C0C0',
          25: '#C8C8C8',
          26: '#D0D0D0',
          27: '#D8D8D8',
          28: '#E0E0E0',
          29: '#E8E8E8',
          30: '#F0F0F0',
          31: '#F8F8F8',
          32: '#FFFFFF',
        },
        dynamic: {
          DEFAULT: 'var(--dyn-000000)',
          0: 'var(--dyn-000000)',
          1: 'var(--dyn-080808)',
          2: 'var(--dyn-101010)',
          3: 'var(--dyn-181818)',
          4: 'var(--dyn-202020)',
          5: 'var(--dyn-282828)',
          6: 'var(--dyn-303030)',
          7: 'var(--dyn-383838)',
          8: 'var(--dyn-404040)',
          9: 'var(--dyn-484848)',
          10: 'var(--dyn-505050)',
          11: 'var(--dyn-585858)',
          12: 'var(--dyn-606060)',
          13: 'var(--dyn-686868)',
          14: 'var(--dyn-707070)',
          15: 'var(--dyn-787878)',
          16: 'var(--dyn-808080)',
          17: 'var(--dyn-888888)',
          18: 'var(--dyn-909090)',
          19: 'var(--dyn-989898)',
          20: 'var(--dyn-a0a0a0)',
          21: 'var(--dyn-a8a8a8)',
          22: 'var(--dyn-b0b0b0)',
          23: 'var(--dyn-b8b8b8)',
          24: 'var(--dyn-c0c0c0)',
          25: 'var(--dyn-c8c8c8)',
          26: 'var(--dyn-d0d0d0)',
          27: 'var(--dyn-d8d8d8)',
          28: 'var(--dyn-e0e0e0)',
          29: 'var(--dyn-e8e8e8)',
          30: 'var(--dyn-f0f0f0)',
          31: 'var(--dyn-ffffff)',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-beat': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.5)', opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zeroFadeIn: {
          to: {
            opacity: '1',
          },
        },
      },
      animation: {
        shake: 'shake 0.6s ease-in-out infinite',
        pulse: 'pulse 0.6s linear infinite',
        'pulse-slow': 'pulse 1.5s linear infinite',
        'pulse-beat': 'pulse-beat 0.3s ease-in-out infinite',
        fade: 'fadeIn 0.125s ease-in-out',
        'fade-slow': 'fadeIn 0.25s ease-in-out',
      },
      screens: {
        'not-md': { max: '768px' },
      },
    },
  },
  plugins: [plugin(containerPlugin), plugin(animationDelayPlugin)],
};
export default config;
