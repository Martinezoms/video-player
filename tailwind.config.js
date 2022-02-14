module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dodgerBlue: "#1E90FF",
        fontColor: "#FFFF"
      },
      screens: {
        "3xl": { min: "1536px" },
        xs: { max: "540px" },
        xxs: { max: "309px" }
      }
    }
  },
  plugins: []
};
