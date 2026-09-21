import { defineConfig } from "yummacss";

export default defineConfig({
  source: ["./src/**/*.{ts,tsx,mdx,mjs}"],
  theme: {
    colors: {
      "accent-dim": { light: "#8892c2", dark: "#9aa5ef" },
      "diff-add": { light: "#2e7d5b", dark: "#a8e1ad" },
      "diff-remove": { light: "#a8372b", dark: "#e1a8a8" },
      accent: { light: "#4c5fc7", dark: "#bec6f2" },
      border: { light: "#dde1eb", dark: "#232741" },
      code: { light: "#3e4a80", dark: "#dda2f6" },
      ink: { light: "#14171f", dark: "#ffffff" },
      page: { light: "#f7f8fb", dark: "#151724" },
      surface: { light: "#ffffff", dark: "#1a1d2e" },
    },
  },
});
