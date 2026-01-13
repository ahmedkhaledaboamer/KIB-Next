/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   
    "./pages/**/*.{js,ts,jsx,tsx}",  
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Majalla', 'serif'], 
      },
      colors: {
        primary: "#fd9908",
        secondary: "#181f29",
        tertiary: "#00d3ff",
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      screens: {
        'xs': '320px',   // موبايلات صغيرة جدًا
        'sm': '480px',   // موبايلات
        'md': '768px',   // تابليت
        'lg': '1024px',  // لابتوب صغير
        'xl': '1280px',  // لابتوب كبير
        '2xl': '1600px', // شاشات واسعة
        '3xl': '1920px', // شاشات 4k تقريبًا
      },
    },
  },
  plugins: [],
};
