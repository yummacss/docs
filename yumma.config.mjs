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
      // Dark values = original docs palette (untouched). Light values are pairs
      // only. `white` / `black` are built-ins the site already used (c-white,
      // bg-white, c-black); pairing them keeps light mode working without a
      // new token name.
      accent: { light: "#232741", dark: "#bec6f2" },
      "accent-dim": { light: "#64748b", dark: "#9aa5ef" },
      border: { light: "#cbd5e1", dark: "#232741" },
      code: { light: "#2563eb", dark: "#dda2f6" },
      page: { light: "#ffffff", dark: "#151724" },
      surface: { light: "#f1f5f9", dark: "#1a1d2e" },
      white: { light: "#232741", dark: "#ffffff" },
      black: { light: "#ffffff", dark: "#000000" },
      "diff-add": "#a8e1ad",
      "diff-remove": "#e1a8a8",
    },
  },
});
