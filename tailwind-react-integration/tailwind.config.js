module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  corePlugins: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  variants: {},
  darkmode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
