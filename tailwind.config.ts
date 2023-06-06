import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  prefix: 'tw-',
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      blue: '#1fb6ff',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
      wedgewood: {
        '50': '#f2f9f9',
        '100': '#ddeff0',
        '200': '#bfe0e2',
        '300': '#92cace',
        '400': '#5faab1',
        '500': '#438e96',
        '600': '#3b757f',
        '700': '#356169',
        '800': '#325158',
        '900': '#2d464c',
        '950': '#1a2c32',
        gray: '#6A7B76',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        custom: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      },
    },
  },
  plugins: [],
} satisfies Config;
