import { defineConfig } from "yummacss";

export default defineConfig({
  // One glob, not a list of directories. Enumerating them is what caused the
  // scanner bug this replaced: `src/lib` was left out by accident and nothing
  // said so. A glob cannot be accidentally narrow.
  source: ["./src/**/*.{ts,tsx,mdx,mjs}"],
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
