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
