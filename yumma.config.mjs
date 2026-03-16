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
  theme: {
    colors: {
      periwinkle: "#bec6f2",
      navy: "#31365e",
      midnight: "#1a1d2e",
      obsidian: "#232741",
      amethyst: "#dda2f6",
      charcoal: "#21243f",
    },
  },
});
