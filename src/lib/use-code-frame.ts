"use client";

import { useTheme } from "@/lib/theme";

/**
 * Code-block chrome matched to github.com/rrenildopereiraa/snippets
 * Default-theme frame colors. Light mode uses tabBar = surface & tabActive =
 * page; dark mode inverts that (page bar, surface tab) like eclipsa frames.
 */
export function useCodeFrame() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return {
    isLight,
    frame: isLight
      ? "o-h my-4 bc-border bg-page bw-1"
      : "cs-d o-h my-4 bc-border bg-surface bw-1",
    framePreview: isLight ? "bg-page" : "cs-d bg-surface",
    frameInline: isLight ? "bg-page" : "cs-d bg-surface",
    tabBar: isLight ? "d-f bc-border bg-surface" : "d-f bc-border bg-page",
    tabActive: isLight
      ? "d-f ai-c px-6 py-2 brw-1 bc-border bg-page"
      : "d-f ai-c px-6 py-2 brw-1 bc-border bg-surface",
    titleText: "c-accent-dim fs-xs ff-m",
    tabSelected: isLight ? "c-accent-dim bg-page" : "c-accent bg-surface",
    tabUnselected: "c-accent-dim bg-transparent bbw-1",
    copyButton: isLight
      ? "d-f ai-c g-1 px-2 py-1 c-code h:c-accent fv:oc-accent fv:ow-2"
      : "d-f ai-c g-1 px-2 py-1 c-accent h:c-accent-4 fv:oc-accent fv:ow-2",
  };
}
