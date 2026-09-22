"use client";

import { Button } from "@base-ui/react";
import { useEffect, useState } from "react";
import { HalfMoon, Monitor, SunLight } from "@/icons";
import { THEME_KEY, THEMES, type Theme } from "@/utils/theme";

const ICONS = { dark: HalfMoon, light: SunLight, auto: Monitor };

const LABELS = { dark: "dark", light: "light", auto: "system" };

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = document.documentElement.dataset.theme;
    setTheme(stored === "light" || stored === "auto" ? stored : "dark");
  }, []);

  const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];

  const apply = () => {
    setTheme(next);
    if (next === "dark") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = next;
    }
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  // the icon names the theme in use, the label names the one a press moves to
  const Icon = ICONS[theme];

  return (
    <Button
      type="button"
      onClick={apply}
      aria-label={`Theme: ${LABELS[theme]}. Switch to ${LABELS[next]}`}
      className="d:f ai:c jc:c w:8 h:8 bc:border bg:surface h:bg:surface-8 c:ink bw:1 bf-b:sm fv:oc:ink fv:ow:2"
    >
      <Icon className="w:4 h:4" />
    </Button>
  );
}
