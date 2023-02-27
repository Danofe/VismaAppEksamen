/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        home: {
          100: "#333232",
          200: "#242424",
        },
        opacity: ["group-hover"],
        Animation: {
          keyframes: {
            sweep:
              "0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(360deg); }",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwind-typewriter")({
      wordsets: {
        logo: {
          words: ["VISMA."],
          repeat: 0,
          eraseSpeed: 0.0,
          caretWidth: 0,
          writespeed: 0.6,
          delay: 0,
          pausebeetween: 2,
        },
        kalender: {
          words: ["KALENDER "],
          repeat: 0,
          eraseSpeed: 0.0,
          caretWidth: 0,
          writeSpeed: 0.08,
          delay: 0,
          pausebeetween: 0,
        },
        profil: {
          words: ["PROFIL "],
          repeat: 0,
          eraseSpeed: 0.0,
          caretWidth: 0,
          writeSpeed: 0.08,
          delay: 0,
          pausebeetween: 0,
        },
      },
    }),
  ],
};
// Alt er skrevet av: Daniel
