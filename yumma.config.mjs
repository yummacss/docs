import { defineConfig } from "yummacss";

export default defineConfig({
  source: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.mdx",
    "./src/mdx-components.tsx",
    "./src/registry/**/*.tsx",
  ],
  output: "./src/styles/out.css",
  normalize: true,
  safelist: [
    "mx--4",
    "bg-highlight/10",
    "bg-diff-add/10",
    "bg-diff-remove/10",
    "bc-highlight/50",
  ],
  theme: {
    colors: {
      "diff-add": "#a8e1ad",
      "diff-remove": "#e1a8a8",
      clay: "#232741",
      highlight: "#9aa5ef",
      mauve: "#dda2f6",
      midnight: "#1a1d2e",
      mirage: "#151724",
      navy: "#31365e",
      periwinkle: "#bec6f2",
    },
  },
});
