"use client";

import type { RegistryMeta, RegistryProp } from "@/registry";

/**
 * The style axes that mean the same thing on every component, so a value set
 * on one page is worth carrying to the next. `variant`, `tone` and `intent`
 * are deliberately absent: they share a name across components and nothing
 * else, so `tone: "light"` on Tooltip means nothing on Badge.
 */
const CARRIED = ["shape", "size", "shadow", "animated", "focus"] as const;

const KEY = "yui:playground";

type Carried = Record<string, string | number | boolean>;

/** Reads what the last page left, or nothing if storage is unavailable. */
export function readCarried(): Carried {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? (parsed as Carried) : {};
  } catch {
    return {};
  }
}

/** Keeps the carried props out of the values a component does not share. */
export function writeCarried(values: Record<string, unknown>): void {
  const next: Carried = {};

  for (const name of CARRIED) {
    const value = values[name];
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      next[name] = value;
    }
  }

  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private windows and blocked site data. The playground still works.
  }
}

export function clearCarried(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // As above.
  }
}

/** Whether this component can take that carried value at all. */
function accepts(prop: RegistryProp, value: unknown): boolean {
  if (prop.type === "boolean") return typeof value === "boolean";
  // `shape` alone has six vocabularies across the registry, so a carried
  // `pill` has to be checked against the component in front of it.
  if (prop.type === "enum")
    return Boolean(prop.values?.includes(String(value)));
  return false;
}

/**
 * The carried values this component accepts and the URL has not already
 * spoken for. An address someone was sent wins over what the last page left.
 */
export function carriedFor(
  meta: RegistryMeta,
  carried: Carried,
  claimed: (name: string) => boolean,
): Carried {
  const out: Carried = {};

  for (const name of CARRIED) {
    if (!(name in carried) || claimed(name)) continue;
    const prop = meta.props.find((entry) => entry.name === name);
    if (prop && accepts(prop, carried[name])) out[name] = carried[name];
  }

  return out;
}
