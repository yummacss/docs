"use client";

import type { RegistryMeta, RegistryProp } from "@/registry";

const CARRIED = ["shape", "size", "shadow", "animated", "focus"] as const;

const KEY = "yui:playground";

type Carried = Record<string, string | number | boolean>;

export function readCarried(): Carried {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? (parsed as Carried) : {};
  } catch {
    return {};
  }
}

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
  } catch {}
}

export function clearCarried(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
}

function accepts(prop: RegistryProp, value: unknown): boolean {
  if (prop.type === "boolean") return typeof value === "boolean";
  if (prop.type === "enum")
    return Boolean(prop.values?.includes(String(value)));
  return false;
}

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
