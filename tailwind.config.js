module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lazycrazy: {
          primary: '#002F34',
          secondary: '#23E5DB',
          accent: '#FFCE32',
          gray: '#F8F9FA'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
