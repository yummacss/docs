"use client";

import { colorTheme, generateShades } from "@yummacss/core";

const SURFACE: {
  name: string;
  selector: string;
  property: string;
  shade: number;
}[] = [
  {
    name: "bg-slate-12",
    selector: ".bg-slate-12",
    property: "background-color",
    shade: 12,
  },
  {
    name: "bc-slate-12",
    selector: ".bc-slate-12",
    property: "border-color",
    shade: 12,
  },
  {
    name: "blc-slate-12",
    selector: ".blc-slate-12",
    property: "border-left-color",
    shade: 12,
  },
  {
    name: "h:bg-slate-11",
    selector: ".h\\:bg-slate-11:hover",
    property: "background-color",
    shade: 11,
  },
  { name: "f-slate-12", selector: ".f-slate-12", property: "fill", shade: 12 },
  {
    name: "s-slate-12",
    selector: ".s-slate-12",
    property: "stroke",
    shade: 12,
  },
];

export const ACCENT_CLASSES = SURFACE.map((entry) => entry.name);

export const ACCENT_EXCLUDES = ["c-slate-12"];

export const ACCENTS = Object.keys(colorTheme);

export const DEFAULT_ACCENT = "slate";

const KEY = "yui:accent";

export function isAccent(value: unknown): value is string {
  return typeof value === "string" && ACCENTS.includes(value);
}

export function accentCss(family: string): string {
  if (family === DEFAULT_ACCENT || !isAccent(family)) return "";

  const shades = generateShades(colorTheme[family as keyof typeof colorTheme]);

  return SURFACE.map(
    ({ selector, property, shade }) =>
      `${selector} { ${property}: ${shades[shade]}; }`,
  ).join("\n");
}

export function readAccent(): string {
  try {
    const stored = window.localStorage.getItem(KEY);
    return isAccent(stored) ? stored : DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}

export function writeAccent(family: string): void {
  try {
    window.localStorage.setItem(KEY, family);
  } catch {}
}
