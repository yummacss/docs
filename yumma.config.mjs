import { defineConfig } from "yummacss";

export default defineConfig({
  source: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.mdx",
    "./src/mdx-components.tsx",
    "./src/registry/**/*.tsx",
  ],
  safelist: [
    // `src/lib/code-decorate.mjs` writes class names but is not in `source`
    // above, so everything it emits has to be listed here. Adding the file to
    // `source` was tried & the scanner still did not pick it up.
    "mx--4",
    "d-i",
    // The playground's checked checkbox. `bc-accent-dim` generates from the
    // same string literal & this one does not, which is the scanner gap again
    // rather than anything about the class.
    "bg-accent-dim",
    "bg-accent-dim/10",
    "bg-diff-add/10",
    "bg-diff-remove/10",
    "bc-accent-dim/50",
    // Accordion: the class scanner misses these in this file even though
    // they're plain, unconditional string literals - see NOTES.md.
    "max-w-96",
    "blc-indigo-5",
    "c-indigo-6",
    "c-indigo-9",
    "ro-36",
    // Collapsible: same scanner gap, different file - see NOTES.md.
    "o-100",
    "tp-t",
    "ro-90",
    // Menu: same scanner gap again.
    "h-fc",
    // Tabs: and again.
    "tp-a",
  ],
  theme: {
    colors: {
      // Paired colors follow the OS by default; override with `cs-l` / `cs-d`
      // / `cs-ld` on <html>. Same palette as snippets.renildo.dev.
      accent: { light: "#2563eb", dark: "#bec6f2" },
      "accent-dim": { light: "#64748b", dark: "#b9bed5" },
      border: { light: "#cbd5e1", dark: "#31365e" },
      code: "#2563eb",
      foreground: { light: "#0f172a", dark: "#f8fafc" },
      page: { light: "#ffffff", dark: "#21243f" },
      surface: { light: "#f1f5f9", dark: "#1e2039" },
      "diff-add": "#86efac",
      "diff-remove": "#fca5a5",
    },
  },
});
