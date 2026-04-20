import { defineConfig } from "yummacss";

export default defineConfig({
  source: [
    "./src/**/*.{ts,tsx}",
    "./src/registry/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
    "./src/mdx-components.tsx",
  ],
  output: "./src/styles/out.css",
  normalize: true,
  safelist: ["mx--4", "bg-highlight/10", "bg-diff-add/10", "bg-diff-remove/10"],
  theme: {
    colors: {
      charcoal: "#21243f",
      clay: "#232741",
      cornflower: "#9aa6ef",
      "diff-add": "#a8e1ad",
      "diff-remove": "#e1a8a8",
      highlight: "#9aa5ef",
      mauve: "#dda2f6",
      midnight: "#1a1d2e",
      mirage: "#151724",
      navy: "#31365e",
      periwinkle: "#bec6f2",
    },
  },
});
