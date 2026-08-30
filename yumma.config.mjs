import { defineConfig } from "yummacss";

export default defineConfig({
  source: [
    "../src/**/*.{ts,tsx,mdx,mjs}"
  ],
  // Every entry below is a workaround for one bug: nitro's tokenizer paired
  // quotes with a regex, so an empty literal `""` desynced every class after
  // it in the file. Fixed in the monorepo, not yet released. When a release
  // carrying that lands, do two things together and this list goes to zero:
  // add "./src/lib/**/*.mjs" to `source` above, and delete `safelist`
  // entirely. Verified: scanning that glob with no safelist generates all
  // sixteen. See NOTES.md, Phase 1.
  safelist: [
    // `src/lib/code-decorate.mjs`. It is not in `source`, and the older note
    // claiming the glob was tried and did not help was wrong - the file holds
    // `/"([^"]+)"/g` on line 43, three quotes, which hid everything below it.
    "mx--4",
    "d-i",
    // The playground's checked checkbox. `bc-accent-dim` generated from the
    // same string literal and this one did not, which is the quote-parity
    // bug rather than anything about the class.
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
