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
    // Classes from code-decorate.mjs (not in `source` scan).
    "mx--4",
    "d-i",
    // Scanner gap: literal `bg-accent-dim` vs generated `bc-accent-dim`.
    "bg-accent-dim",
    "bg-accent-dim/10",
    "bg-diff-add/10",
    "bg-diff-remove/10",
    "bc-accent-dim/50",
    // Scanner misses plain literals in accordion.tsx (see NOTES.md).
    "max-w-96",
    "blc-indigo-5",
    "c-indigo-6",
    "c-indigo-9",
    "ro-36",
    // Scanner gap in collapsible.tsx.
    "o-100",
    "tp-t",
    "ro-90",
    // Scanner gap in menu.tsx.
    "h-fc",
    // Scanner gap in tabs.tsx.
    "tp-a",
  ],
  theme: {
    colors: {
      // Light pairs only; dark values are the original docs palette.
      accent: { light: "#232741", dark: "#bec6f2" },
      "accent-dim": { light: "#64748b", dark: "#9aa5ef" },
      border: { light: "#cbd5e1", dark: "#232741" },
      code: { light: "#9aa5ef", dark: "#dda2f6" },
      page: { light: "#ffffff", dark: "#151724" },
      surface: { light: "#f1f5f9", dark: "#1a1d2e" },
      // Docs prose colors, not platform white/black.
      foreground: { light: "#232741", dark: "#ffffff" },
      inverse: { light: "#ffffff", dark: "#000000" },
      "diff-add": "#a8e1ad",
      "diff-remove": "#e1a8a8",
    },
  },
});
