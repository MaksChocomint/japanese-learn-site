import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dark-gradient": "url('/background.jpg')",
        header: "url('/header.png')",
        flowers: "url('/flowers.png')",
        "header-bottom": "url('/header-bottom.png')",
        "business-card": "url('/business-card-background.png')",
        avatar: "url('/avatar.jpg')",
        "dark-red-gradient":
          "linear-gradient(180deg, rgb(122, 21, 37) 0%, rgb(44, 21, 29) 100%)",
        "dark-red-gradient-2":
          "linear-gradient(180deg, rgb(32, 16, 22) 0%, rgb(14, 10, 16) 100%)",
      },
      colors: {},
    },
  },
  plugins: [],
};
export default config;
