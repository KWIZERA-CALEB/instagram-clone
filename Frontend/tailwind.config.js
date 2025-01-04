/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        afacadFlux: ['Afacad Flux', 'sans-serif'],
      },
      screens: {
        sm: '640px',
        
        md: '784px',
      
        lg: '1024px',
        
        xl: '1280px',
      },
    },
  },
  plugins: [],
}

