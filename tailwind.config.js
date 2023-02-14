/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem",
      },
      borderRadius: {
        3: "3px",
      },
      borderWidth: {
        1: "1px",
      },
      backgroundColor: {
        overlayDark: "rgba(0, 0, 0, .4)",
        overlayLight: "rgba(225, 225, 225, .5)",
      },
      height: {
        "9/10": "92.5%",
        "1/10": "10%",
        "7/10": "70%",
      },
      transitionDuration: {
        400: "400ms",
      },
      letterSpacing: {
        extraWide: ".5rem",
      },
      width: {
        "8/10": "85%",
        15: "15%",
      },
      margin: {
        15: "15%",
      },
    },
  },
  plugins: [],
};
