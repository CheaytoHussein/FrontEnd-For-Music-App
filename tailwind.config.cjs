/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'zero-screen' : '0px',
      },
      boxShadow: {
        '3xl': '0 15px 60px -15px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
      }
    },
  },
  plugins: [
    // require('tailwind-scrollbar-hide')
  ],
}
