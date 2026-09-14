"use client";

import { colorTheme, generateShades } from "@yummacss/core";

/**
 * The accent recolours the preview and nothing you install.
 *
 * There is no variable to repoint: every component names its colour as a
 * literal class, so the only way to recolour one without editing it is to
 * redefine those classes inside the preview frame. Four selectors carry the
 * accent. `c-slate-12` is deliberately not one of them: that is a label on
 * white, not the control.
 */
const SURFACE: {
  /** The class as a component writes it, which the guard in the tests reads. */
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
  // The dark tooltip's arrow paints the popup's own surface, so it has to
  // move with it or a recoloured tooltip keeps a near-black point.
  { name: "f-slate-12", selector: ".f-slate-12", property: "fill", shade: 12 },
  {
    name: "s-slate-12",
    selector: ".s-slate-12",
    property: "stroke",
    shade: 12,
  },
];

/** What the accent covers, for the test that keeps it level with the registry. */
export const ACCENT_CLASSES = SURFACE.map((entry) => entry.name);

/** Named in the registry but deliberately left alone: a label, not a control. */
export const ACCENT_EXCLUDES = ["c-slate-12"];

/** Every family Yumma ships, in the order its own theme lists them. */
export const ACCENTS = Object.keys(colorTheme);

export const DEFAULT_ACCENT = "slate";

const KEY = "yui:accent";

export function isAccent(value: unknown): value is string {
  return typeof value === "string" && ACCENTS.includes(value);
}

/**
 * The override, or an empty string for the accent the components already
 * carry, which needs no rules at all.
 */
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
  } catch {
    // Private windows and blocked site data. The preview still renders.
  }
}
