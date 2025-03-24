module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  corePlugins: [],
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
  darkMode: "media", // or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
