module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: () => ({
        'hero-pattern': 'url("pattern-bg.png")',
      }),
    },
  },
  plugins: [],
};
