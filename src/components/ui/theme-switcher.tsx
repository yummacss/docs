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
 * Cycles light → dark → auto. Same chrome as the search / mobile menu buttons.
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
      className="d-f ai-c jc-c h-8 px-3 bc-border bg-surface h:bg-surface-8 c-accent-dim h:c-ink bw-1 bf-b-sm fv:oc-ink fv:ow-2"
    >
      <Icon className="w-4 h-4" aria-hidden />
    </Button>
  );
}
