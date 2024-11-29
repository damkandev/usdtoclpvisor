/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			contenedor: '#FFF7EE',
  			background: '#3E3730',
  			primary: '#3E3730',
  			secondary: '#686159'
  		},
  		fontFamily: {
  			GeneralMedium: 'General Medium',
  			GeneralSemibold: 'General Semibold',
  			Nohemi: 'Nohemi Extrabold'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
