"use client";

import { Button } from "@base-ui/react";
import { Computer, HalfMoon, SunLight } from "iconoir-react";
import { type ThemeMode, useTheme } from "@/lib/theme";

const MODE_ICON = {
  light: SunLight,
  dark: HalfMoon,
  auto: Computer,
} as const;

const MODE_LABEL: Record<ThemeMode, string> = {
  light: "Light theme — click for dark",
  dark: "Dark theme — click for auto",
  auto: "Auto theme (follows OS) — click for light",
};

export default function ThemeSwitcher() {
  const { mode, cycleMode } = useTheme();
  const Icon = MODE_ICON[mode];

  return (
    <Button
      type="button"
      onClick={cycleMode}
      aria-label={MODE_LABEL[mode]}
      title={MODE_LABEL[mode]}
      className="d-f ai-c jc-c h-8 w-8 bc-border bg-surface h:bg-surface-8 c-accent-dim h:c-accent bw-1 bf-b-sm fv:oc-accent fv:ow-2"
    >
      <Icon className="w-4 h-4" aria-hidden />
    </Button>
  );
}
