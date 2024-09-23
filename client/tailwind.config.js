module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // Ensures Tailwind scans all files in src
    './pages/**/*.{js,ts,jsx,tsx}', // Adjust for your pages directory structure
    './components/**/*.{js,ts,jsx,tsx}', // Adjust for your components
    './public/index.html', // If you're using an HTML file for entry point
  ],
  theme: {
    extend: {
      colors: {
        dark_primary: '#253D57', // Custom color for dark_primary
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Inria: ['Inria Serif', 'serif'],
        Paprika: ['Paprika', 'sans-serif'],
      },
    },
  },
  plugins: [],
};