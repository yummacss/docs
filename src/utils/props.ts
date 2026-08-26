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
 * Only enums, booleans, and icon slots get a control. Strings and numbers are
 * still part of the API - labels, placeholders, min/max - but a free-text field
 * for each one would drown the rail in inputs that barely change what the
 * component looks like. Callbacks and fixture arrays (`none`) have no widget
 * at all. They stay listed under Not Controllable either way.
 *
 * A slot with an `exampleIcon` is the exception. It is a `ReactNode` too, but
 * the schema names a glyph for it, which is enough to answer the only question
 * a control could ask of a slot: is there something in it.
 */
export function isControllable(prop: RegistryProp): boolean {
  if (prop.exampleIcon) return true;
  return prop.type === "enum" || prop.type === "boolean";
}
