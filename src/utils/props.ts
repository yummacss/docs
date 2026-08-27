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
 * Whether the playground offers a widget for this prop.
 *
 * Enums and booleans only, plus a slot the schema names a glyph for. A string
 * or a number would need a text field, and a rail of text fields is a form
 * rather than an API: Field alone would carry six, none of which say anything
 * a reader could not already guess. They stay listed & documented, they just
 * do not take input.
 *
 * A slot with an `exampleIcon` is the odd one in: it is a `ReactNode`, but the
 * schema names a glyph for it, which answers the only question a control can
 * ask of a slot - is there something in it.
 */
export function isControllable(prop: RegistryProp): boolean {
  if (prop.exampleIcon) return true;
  return prop.type === "enum" || prop.type === "boolean";
}

/**
 * Whether this prop does anything given what is currently set.
 *
 * `iconSide` moves an icon that may not be there. Leaving it live is an
 * invitation to click something that cannot change the preview, so the schema
 * names what a prop needs and the rail dims it until that is filled.
 */
export function isInert(
  prop: RegistryProp,
  values: Record<string, unknown>,
): boolean {
  if (!prop.dependsOn) return false;
  const on = values[prop.dependsOn];
  return on === undefined || on === null || on === false || on === "";
}
