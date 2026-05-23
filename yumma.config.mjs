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
    "bg-accent-dim/10",
    "bg-diff-add/10",
    "bg-diff-remove/10",
    "bc-accent-dim/50",
  ],
  theme: {
    colors: {
      "accent-dim": "#9aa5ef",
      "diff-add": "#a8e1ad",
      "diff-remove": "#e1a8a8",
      accent: "#bec6f2",
      border: "#232741",
      code: "#dda2f6",
      page: "#151724",
      surface: "#1a1d2e",
    },
  },
});
