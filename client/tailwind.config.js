// tailwind.config.js
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
      // Add custom text shadow utilities
      textShadow: {
        glow: '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.7)', // Define your glow effect
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-glow': {
          textShadow: '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.7)',
        },
        '.hover\\:text-shadow-glow:hover': {
          textShadow: '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.7)',
        },
      });
    },
  ],
};
