import {
  BellNotification,
  Bookmark,
  Check,
  Folder,
  HalfMoon,
  Mail,
  Page,
  PagePlus,
  PageSearch,
  Star,
  StatUp,
  SunLight,
  Trash,
  User,
  UserPlus,
  Wrench,
} from "iconoir-react";
import type { ComponentType } from "react";
import type { RegistryMeta } from "@/registry";
import { iconMarker } from "@/utils/snippet";

export type DemoProps = Record<string, unknown>;

/** Curated iconoir map for tree-shaking; add names here explicitly. */
export const EXAMPLE_ICONS: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  BellNotification,
  Bookmark,
  Check,
  Folder,
  HalfMoon,
  Mail,
  Page,
  PagePlus,
  PageSearch,
  Star,
  StatUp,
  SunLight,
  Trash,
  User,
  UserPlus,
  Wrench,
};

/** Icon from schema `exampleIcon`, at slot size. */
export function exampleIcon(name: string) {
  const Icon = EXAMPLE_ICONS[name];
  return Icon ? <Icon className="w-5 h-5" /> : undefined;
}

/** Demo prop values from schema defaults and examples (raw; pass through `resolveIcons` to render). */
export function seedValues(meta: RegistryMeta): DemoProps {
  const values: DemoProps = {};

  for (const prop of meta.props) {
    // `example: null` keeps an optional icon slot empty by default.
    if (prop.example === null) continue;

    if (prop.exampleIcon) {
      const icon = exampleIcon(prop.exampleIcon);
      if (icon) {
        values[prop.name] = icon;
        continue;
      }
    }
    const value = prop.example ?? prop.default;
    if (value !== undefined) values[prop.name] = value;
  }

  return values;
}

/** Replace nested `{ "$icon": "..." }` markers with React elements for preview. */
export function resolveIcons(value: unknown): unknown {
  const marker = iconMarker(value);
  if (marker) {
    const Icon = EXAMPLE_ICONS[marker.name];
    return Icon ? <Icon className={marker.size ?? "w-6 h-6"} /> : undefined;
  }
  if (Array.isArray(value)) return value.map(resolveIcons);
  if (typeof value === "object" && value !== null) {
    // Do not recurse into React elements.
    if ("$$typeof" in value) return value;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveIcons(item)]),
    );
  }
  return value;
}
