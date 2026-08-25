"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeMode = "light" | "dark" | "auto";

export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "yummacss.com-theme";

// Yumma CSS color-scheme utilities: `cs-l` / `cs-d` force a scheme, `cs-ld`
// follows the operating system. Applied to <html> so Base UI portals inherit.
export const MODE_CLASS: Record<ThemeMode, string> = {
  light: "cs-l",
  dark: "cs-d",
  auto: "cs-ld",
};

export function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "auto";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "auto";
}

export function applyThemeClass(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove("cs-l", "cs-d", "cs-ld");
  root.classList.add(MODE_CLASS[mode]);
}

function readOsTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Blocking script for <head> so the first paint already uses the stored scheme. */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var m=s==="light"||s==="dark"?s:"auto";var c={light:"cs-l",dark:"cs-d",auto:"cs-ld"};var r=document.documentElement;r.classList.remove("cs-l","cs-d","cs-ld");r.classList.add(c[m]);}catch(e){}})();`;

const ThemeContext = createContext<{
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
} | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

const CYCLE: ThemeMode[] = ["light", "dark", "auto"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(readStoredTheme);
  const [osTheme, setOsTheme] = useState<ResolvedTheme>(readOsTheme);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    applyThemeClass(mode);
  }, [mode]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setOsTheme(query.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const cycleMode = () =>
    setMode((current) => CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        resolvedTheme: mode === "auto" ? osTheme : mode,
        setMode,
        cycleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
