import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dazzling Blue - Primary
        primary: {
          50: '#eef4ff',
          100: '#dce8ff',
          200: '#b9d1ff',
          300: '#8ab4ff',
          400: '#5a8fe8',
          500: '#4a6bc4',
          600: '#3b5998',
          700: '#324d82',
          800: '#2a406b',
          900: '#243659',
          950: '#172236',
        },
        // Pear Yellow/Green - Secondary
        secondary: {
          50: '#f9fce6',
          100: '#f2f8c8',
          200: '#e5f196',
          300: '#d4e65a',
          400: '#c4d600',
          500: '#a8ba00',
          600: '#859400',
          700: '#657000',
          800: '#505900',
          900: '#434a00',
          950: '#242800',
        },
        // Skyan (Cyan/Turquoise) - Accent
        accent: {
          50: '#e6fffe',
          100: '#b3fffc',
          200: '#80fff9',
          300: '#4df5ed',
          400: '#3aded5',
          500: '#2ac4bc',
          600: '#1fa39c',
          700: '#17827c',
          800: '#12665f',
          900: '#0d524d',
          950: '#073330',
        },
        // Jasmine Green
        jasmine: {
          50: '#f0fdf0',
          100: '#dcfcdc',
          200: '#bbf7bb',
          300: '#86ef86',
          400: '#6cd96c',
          500: '#4abe4a',
          600: '#3a9d3a',
          700: '#317b31',
          800: '#2c622c',
          900: '#275127',
          950: '#112c11',
        },
        // Tangerine (Orange)
        tangerine: {
          50: '#fff5f0',
          100: '#ffe8dd',
          200: '#ffd0bb',
          300: '#ffae8a',
          400: '#ff7f4d',
          500: '#f04e23',
          600: '#dc3912',
          700: '#b62d0d',
          800: '#942712',
          900: '#782414',
          950: '#410f06',
        },
      },
      fontFamily: {
        /*
         * KAG Brand Typography
         * Based on KAG Brand Guidelines 2025
         */

        // English fonts
        poppins: ['Poppins', 'system-ui', 'sans-serif'],      // Headlines
        outfit: ['Outfit', 'system-ui', 'sans-serif'],        // Body text
        altair: ['Altair', 'system-ui', 'sans-serif'],        // Decorative headlines

        // Arabic fonts
        sahel: ['Sahel', 'system-ui', 'sans-serif'],          // Headlines
        'noto-arabic': ['Noto Sans Arabic', 'system-ui', 'sans-serif'], // Body text
        handicrafts: ['TheYearofHandicrafts', 'system-ui', 'sans-serif'], // Decorative headlines

        // Semantic aliases
        'heading': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Outfit', 'system-ui', 'sans-serif'],
        'display': ['Altair', 'system-ui', 'sans-serif'],
        'heading-ar': ['Sahel', 'system-ui', 'sans-serif'],
        'body-ar': ['Noto Sans Arabic', 'system-ui', 'sans-serif'],
        'display-ar': ['TheYearofHandicrafts', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
