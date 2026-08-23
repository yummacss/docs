import type { RegistryProp } from "@/registry";

/**
 * An enum reads as its own values. `typeName` covers everything the schema
 * cannot offer a control for, where `type` would only say `none`.
 */
export function typeOf(prop: RegistryProp): string {
  if (prop.typeName) return prop.typeName;
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

/**
 * Whether the playground can offer a widget for this prop.
 *
 * A callback, a `ReactNode` slot or an array of fixture objects has no control
 * a reader could sensibly operate, and the schema marks all of those `none`.
 * They are still part of the API, so the rail lists them either way.
 */
export function isControllable(prop: RegistryProp): boolean {
  return prop.type !== "none";
}
