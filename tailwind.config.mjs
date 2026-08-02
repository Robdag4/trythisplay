/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E11D2E",
          "red-dark": "#B01322",
          "red-glow": "#FF2E40",
          black: "#0A0A0B",
          charcoal: "#121214",
          panel: "#18181B",
          line: "#26262B",
          silver: "#9CA1A8",
          white: "#F7F7F8"
        }
      },
      fontFamily: {
        display: ["Anton", "Arial Narrow", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      },
      backgroundImage: {
        "stadium-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(225,29,46,0.18), transparent 70%)"
      }
    }
  },
  plugins: []
};
