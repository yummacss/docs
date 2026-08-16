import path from "node:path";
import { defineConfig } from "vitest/config";

// `import.meta.dirname` rather than `__dirname`: Vite's native config loader
// does not provide the CJS globals, and warns that it will become the default.
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
