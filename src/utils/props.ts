import type { RegistryProp } from "@/registry";

export function typeOf(prop: RegistryProp): string {
  if (prop.typeName) return prop.typeName;
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

export function isControllable(prop: RegistryProp): boolean {
  if (prop.controlled && !prop.handler) return false;
  if (prop.exampleIcon || prop.optional) return true;
  return (
    prop.type === "enum" || prop.type === "boolean" || prop.type === "number"
  );
}

export function isInert(
  prop: RegistryProp,
  values: Record<string, unknown>,
  props: RegistryProp[],
): string | null {
  for (const rule of prop.conflictsWith ?? []) {
    const other = props.find((entry) => entry.name === rule.prop);
    const actual = values[rule.prop] ?? other?.default;

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

export const SHARED_PROP_ORDER = [
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
  "disabled",
  "loading",
  "readOnly",
  "required",
  "animated",
  "transition",
  "className",
  "focus",
  "container",
] as const;

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
