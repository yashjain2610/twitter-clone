/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        twitterLightGray: '#71767B',
        twitterDarkGray: '#17181C',
        twitterWhite: 'rgb(231, 233, 234)',
        twitterBlue: '#308CD8',
        twitterBorder: '#2f3336'
      }
    },
  },
  plugins: [],
}
