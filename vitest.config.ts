import path from "node:path";
import { defineConfig } from "vitest/config";

// `import.meta.dirname` for Vite's native ESM config loader.
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
