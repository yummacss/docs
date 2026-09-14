import { parseAsBoolean, parseAsInteger, parseAsStringLiteral } from "nuqs";
import type { RegistryMeta, RegistryProp } from "@/registry";
import { isControllable } from "@/utils/props";

type Values = Record<string, unknown>;

function parserFor(prop: RegistryProp, seeded: unknown) {
  if (prop.exampleIcon || prop.optional) {
    return parseAsBoolean.withDefault(Boolean(seeded));
  }
  if (prop.type === "boolean") {
    return parseAsBoolean.withDefault(Boolean(seeded));
  }
  if (prop.type === "number") {
    return typeof seeded === "number"
      ? parseAsInteger.withDefault(seeded)
      : parseAsInteger;
  }
  if (prop.type === "enum" && prop.values?.length) {
    const values = prop.values as [string, ...string[]];
    const parser = parseAsStringLiteral(values);
    return values.includes(seeded as string)
      ? parser.withDefault(seeded as string)
      : parser;
  }
  return null;
}

export type PlaygroundParser = NonNullable<ReturnType<typeof parserFor>>;

export type PlaygroundKeyMap = Record<string, PlaygroundParser>;

export function keyMapFor(
  meta: RegistryMeta,
  seeded: Values,
): PlaygroundKeyMap {
  const map: PlaygroundKeyMap = {};

  for (const prop of meta.props) {
    if (!isControllable(prop)) continue;
    const parser = parserFor(prop, seeded[prop.name]);
    if (parser) map[prop.name] = parser;
  }

  return map;
}

export function applyQuery(
  meta: RegistryMeta,
  query: Values,
  seeded: Values,
  icon: (name: string) => unknown,
): Values {
  const values = { ...seeded };

  for (const prop of meta.props) {
    if (!(prop.name in query)) continue;
    const value = query[prop.name];

    if (prop.exampleIcon) {
      if (value) values[prop.name] = icon(prop.exampleIcon);
      else delete values[prop.name];
      continue;
    }

    if (prop.optional) {
      values[prop.name] = value ? prop.example : "";
      continue;
    }

    if (value !== null) values[prop.name] = value;
  }

  return values;
}

export function queryFor(
  meta: RegistryMeta,
  values: Values,
): Record<string, string | number | boolean> {
  const query: Record<string, string | number | boolean> = {};

  for (const prop of meta.props) {
    if (!isControllable(prop)) continue;

    if (prop.exampleIcon || prop.optional || prop.type === "boolean") {
      query[prop.name] = Boolean(values[prop.name]);
      continue;
    }

    const value = values[prop.name];
    if (typeof value === "string" || typeof value === "number") {
      query[prop.name] = value;
    }
  }

  return query;
}
