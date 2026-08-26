import type { RegistryProp } from "@/registry";

/** Prop type for display; `typeName` overrides when `type` is only `none`. */
export function typeOf(prop: RegistryProp): string {
  if (prop.typeName) return prop.typeName;
  if (prop.type === "enum" && prop.values) return prop.values.join(" | ");
  return prop.type;
}

/** Whether the playground can offer a widget for this prop. */
export function isControllable(prop: RegistryProp): boolean {
  if (prop.exampleIcon) return true;
  return prop.type === "enum" || prop.type === "boolean";
}
