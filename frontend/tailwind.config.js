/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        aqua: "#23F0C7",
        coral: "#EF767A",
        lemon: "#FFE347",
        snow: "#FFFFFF",
        ink: "#101010",
        mist: "#F6F6F6",
        line: "#D8D8D8"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      boxShadow: {
        sharp: "8px 8px 0 0 #101010"
      }
    }
  },
  plugins: []
};
