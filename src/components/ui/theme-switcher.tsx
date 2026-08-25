"use client";

import { Button } from "@base-ui/react";
import { Computer, HalfMoon, SunLight } from "iconoir-react";
import { type ThemeMode, useTheme } from "@/lib/theme";

const MODE_ICON = {
  light: SunLight,
  dark: HalfMoon,
  auto: Computer,
} as const;

const MODE_TOOLTIP: Record<ThemeMode, string> = {
  light: "Light theme — click for dark",
  dark: "Dark theme — click for auto",
  auto: "Auto theme (follows OS) — click for light",
};

/**
 * Cycles light → dark → auto, matching snippets.renildo.dev's status bar control.
 */
export default function ThemeSwitcher() {
  const { mode, cycleMode } = useTheme();
  const Icon = MODE_ICON[mode];

  return (
    <Button
      type="button"
      onClick={cycleMode}
      aria-label={MODE_TOOLTIP[mode]}
      title={MODE_TOOLTIP[mode]}
      className="d-f ai-c jc-c px-3 py-1 bg-transparent bw-0 c-p c-accent-dim h:c-accent h:bg-page fv:os-s fv:oo--2 fv:oc-accent"
    >
      <Icon className="w-4 h-4" aria-hidden />
    </Button>
  );
}
