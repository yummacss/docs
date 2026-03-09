import { defineConfig } from "yummacss";

export default defineConfig({
  source: [
    "./src/**/*.{ts,tsx}",
    "./src/registry/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
    "./src/mdx-components.tsx",
  ],
  output: "./src/styles/out.css",
  buildOptions: {
    reset: true,
  },
});
