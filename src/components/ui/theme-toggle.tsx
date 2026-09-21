"use client";

import { Button } from "@base-ui/react";
import { useEffect, useState } from "react";
import { HalfMoon, SunLight } from "@/icons";
import { THEME_KEY, type Theme } from "@/utils/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  const apply = () => {
    setTheme(next);
    if (next === "light") {
      document.documentElement.dataset.theme = "light";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  return (
    <Button
      type="button"
      onClick={apply}
      aria-label={`Switch to the ${next} theme`}
      className="d:f ai:c jc:c w:8 h:8 bc:border bg:surface h:bg:surface-8 c:ink bw:1 bf-b:sm fv:oc:ink fv:ow:2"
    >
      {theme === "dark" ? (
        <SunLight className="w:4 h:4" />
      ) : (
        <HalfMoon className="w:4 h:4" />
      )}
    </Button>
  );
}
