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
  Wrench,
} from "iconoir-react";
import type { ComponentType } from "react";
import { iconMarker } from "@/utils/snippet";

/**
 * Icons a schema may name via `exampleIcon`, so a component whose only visible
 * content is an icon does not demo itself as an empty box.
 *
 * Curated rather than a dynamic `icons[name]` lookup: indexing the package by a
 * runtime string would defeat tree-shaking & pull every iconoir glyph into the
 * client bundle. Adding one here is a two-line change; making it dynamic is a
 * megabyte.
 *
 * Shared between `<ComponentPreview>` and the `/ui/playground` canvas, which
 * both resolve the same schema field into the same glyph.
 */
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
  Wrench,
};

/**
 * Turns every `{ "$icon": "Star" }` marker nested in an example into the glyph
 * it names, so an icon inside an array of items - a tour step, a menu entry -
 * is not stuck being the one thing JSON cannot hold.
 *
 * The raw example is kept for the snippet, which spells the same marker as
 * `<Star />`, so this walk only ever feeds the rendered preview.
 */
export function resolveIcons(value: unknown): unknown {
  const marker = iconMarker(value);
  if (marker) {
    const Icon = EXAMPLE_ICONS[marker.name];
    return Icon ? <Icon className={marker.size ?? "w-6 h-6"} /> : undefined;
  }
  if (Array.isArray(value)) return value.map(resolveIcons);
  if (typeof value === "object" && value !== null) {
    // A React element is an object too, and recursing into its internals would
    // shred it.
    if ("$$typeof" in value) return value;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveIcons(item)]),
    );
  }
  return value;
}
