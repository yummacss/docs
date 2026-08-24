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
 * A callback or an array of fixture objects has no control a reader could
 * sensibly operate, and the schema marks those `none`. They are still part of
 * the API, so the rail lists them either way.
 *
 * A slot with an `exampleIcon` is the exception. It is a `ReactNode` too, but
 * the schema names a glyph for it, which is enough to answer the only question
 * a control could ask of a slot: is there something in it.
 */
export function isControllable(prop: RegistryProp): boolean {
  return prop.type !== "none" || Boolean(prop.exampleIcon);
}
