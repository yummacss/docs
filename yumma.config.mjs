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
    "mx--4",
    "d-i",
    "bg-accent-dim/10",
    "bc-accent-dim/50",
    // Everything below is one nitro bug, not configuration: the scanner paired
    // quotes across a whole file, so an empty literal hid every class after it.
    // Fixed in nitro; delete these once a release carrying the fix is pinned.
    "bg-accent-dim",
    "bg-diff-add/10",
    "bg-diff-remove/10",
    "max-w-96",
    "blc-indigo-5",
    "c-indigo-6",
    "c-indigo-9",
    "ro-36",
    "o-100",
    "tp-t",
    "h-fc",
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
