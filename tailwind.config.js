// import daisyui from "daisyui";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },

//   plugins: [daisyui],

//   daisyui: {
//     themes: ["all"],
//   },
// };

import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      "light",
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],

          /* Pure Black Dark Mode */
          "base-100": "#000000",
          "base-200": "#0a0a0a",
          "base-300": "#151515",
          neutral: "#1a1a1a",
          primary: "#ffffff",
        },
      },
    ],
  },
};
