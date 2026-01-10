/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {

        rubik: ["Rubik-Regular", "sans-serif"],
        rubikBold: ["Rubik-Bold", "sans-serif"],
        rubikExtraBold: ["Rubik-ExtraBold", "sans-serif"],
        rubikLight: ["Rubik-Light", "sans-serif"],
        rubikMedium: ["Rubik-Medium", "sans-serif"],
        rubikSemiBold: ["Rubik-SemiBold", "sans-serif"],

      },
       primary: {
        100: "#E6FDF0", // very light green
        200: "#C1F6D8",
        300: "#8EEBB7",
        400: "#5BD695",
        500: "#34C476", // main green
        600: "#2DA865",
        700: "#248954",
        800: "#1C6B43",
        900: "#134D32", // dark green
      },
      accent: {
        100: "#FFF8E6", // very light orange
        200: "#FFE5B8",
        300: "#FFD288",
        400: "#FFBF58",
        500: "#FFAA28", // main accent
        600: "#E69521",
        700: "#CC8020",
        800: "#B3661A",
        900: "#994D14", // dark accent
      },
      black: {
        100: "#F5F5F5", // almost white
        200: "#E0E0E0",
        300: "#BDBDBD",
        400: "#9E9E9E",
        500: "#757575",
        600: "#616161",
        700: "#424242",
        800: "#212121",
        900: "#000000", // pure black
      },
      danger: {
        100: "#FFE6E6", // very light red
        200: "#FFB8B8",
        300: "#FF8A8A",
        400: "#FF5C5C",
        500: "#FF2E2E", // main danger red
        600: "#E62929",
        700: "#CC2424",
        800: "#B31F1F",
        900: "#991A1A", // dark red
      },
    },
  },
  plugins: [],
};
