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
      // Dark values are the pre-theme-switcher docs palette, unchanged.
      // Only page / code / accent / ink pair for light mode. Surface & border
      // stay dark in both schemes so chrome stands out on a white page.
      accent: { light: "#f1f5f9", dark: "#bec6f2" },
      "accent-dim": "#9aa5ef",
      border: "#232741",
      code: { light: "#9aa5ef", dark: "#dda2f6" },
      // Headings: white on dark (as before), #1a1d2e on light.
      ink: { light: "#1a1d2e", dark: "#ffffff" },
      page: { light: "#ffffff", dark: "#151724" },
      surface: "#1a1d2e",
      "diff-add": "#a8e1ad",
      "diff-remove": "#e1a8a8",
    },
  },
});
