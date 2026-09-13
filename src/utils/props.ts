import type { RegistryProp } from "@/registry";

/** Prop type for display; `typeName` overrides when `type` is only `none`. */
export function typeOf(prop: RegistryProp): string {
  if (prop.typeName) return prop.typeName;
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

/** Enums, booleans, numbers, icon slots and optional strings. A string's
 * words stay documented; only its presence is driven, and a controlled prop
 * needs its handler named to be either. */
export function isControllable(prop: RegistryProp): boolean {
  if (prop.controlled && !prop.handler) return false;
  if (prop.exampleIcon || prop.optional) return true;
  return (
    prop.type === "enum" || prop.type === "boolean" || prop.type === "number"
  );
}

/**
 * Why a prop is inert under the values on screen, or null if it is not.
 *
 * An absent value counts as the component's own default, so `separated` reads
 * as inert on `variant: "ghost"` whether or not the default was seeded.
 */
export function isInert(
  prop: RegistryProp,
  values: Record<string, unknown>,
  props: RegistryProp[],
): string | null {
  for (const rule of prop.conflictsWith ?? []) {
    const other = props.find((entry) => entry.name === rule.prop);
    const actual = values[rule.prop] ?? other?.default;

    // An icon slot holds an element, not `true`, so presence is its own form.
    if ("set" in rule && Boolean(actual) === rule.set) {
      return `${rule.prop} is ${rule.set ? "set" : "not set"}`;
    }
    if ("is" in rule && actual === rule.is) {
      return `${rule.prop} is ${String(rule.is)}`;
    }
    if ("not" in rule && actual !== rule.not) {
      return `${rule.prop} is not ${String(rule.not)}`;
    }
  }
  return null;
}

/**
 * Where the props that every component shares belong in its table, so the one
 * you are hunting for sits in the same place on every page. Anything not named
 * here is specific to the component and keeps its own order, above these.
 */
export const SHARED_PROP_ORDER = [
  // Style: what it looks like.
  "variant",
  "triggerVariant",
  "tone",
  "triggerTone",
  "confirmTone",
  "iconTone",
  "intent",
  "size",
  "triggerSize",
  "shape",
  "iconShape",
  "shadow",
  // State: what it is doing.
  "disabled",
  "loading",
  "readOnly",
  "required",
  // Behavior.
  "animated",
  "transition",
  // Escape hatches, last because you reach for them last.
  "className",
  "focus",
  "container",
] as const;

/** Props in table order: the component's own first, then the shared tail. */
export function inTableOrder<T extends { name: string }>(props: T[]): T[] {
  const rank = (name: string) => {
    const index = SHARED_PROP_ORDER.indexOf(
      name as (typeof SHARED_PROP_ORDER)[number],
    );
    return index === -1 ? -1 : index;
  };

  return [...props]
    .map((prop, index) => ({ prop, index, rank: rank(prop.name) }))
    .sort((a, b) => {
      if (a.rank === -1 && b.rank === -1) return a.index - b.index;
      if (a.rank === -1) return -1;
      if (b.rank === -1) return 1;
      return a.rank - b.rank;
    })
    .map((entry) => entry.prop);
}
