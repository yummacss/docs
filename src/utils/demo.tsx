import {
  AddFolderIcon,
  AddIcon,
  ArchiveIcon,
  BellIcon,
  BookmarkIcon,
  CheckIcon,
  CopyIcon,
  DocumentAddIcon,
  DocumentIcon,
  ExportIcon,
  FolderIcon,
  HistoryIcon,
  ImportIcon,
  KeyboardIcon,
  MagnifierIcon,
  MoonIcon,
  MoveToFolderIcon,
  PaletteIcon,
  PenIcon,
  PinIcon,
  SettingsIcon,
  SortIcon,
  StarsIcon,
  SunIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TrashBinTrashIcon,
} from "@solar-icons/react/linear";
import type { ComponentType, ReactNode } from "react";
import type { RegistryMeta } from "@/registry";
import Avatar from "@/registry/ui/avatar";
import Button from "@/registry/ui/button";
import Checkbox from "@/registry/ui/checkbox";
import Toggle from "@/registry/ui/toggle";
import { iconMarker } from "@/utils/snippet";

export type DemoProps = Record<string, unknown>;

export const EXAMPLE_ICONS: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  AddFolderIcon,
  AddIcon,
  ArchiveIcon,
  BellIcon,
  BookmarkIcon,
  CheckIcon,
  CopyIcon,
  DocumentAddIcon,
  DocumentIcon,
  ExportIcon,
  FolderIcon,
  HistoryIcon,
  ImportIcon,
  KeyboardIcon,
  MagnifierIcon,
  MoonIcon,
  MoveToFolderIcon,
  PaletteIcon,
  PenIcon,
  PinIcon,
  SettingsIcon,
  SortIcon,
  StarsIcon,
  SunIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TrashBinTrashIcon,
};

export function exampleIcon(name: string) {
  const Icon = EXAMPLE_ICONS[name];
  return Icon ? <Icon className="w:5 h:5" /> : undefined;
}

export function seedValues(meta: RegistryMeta): DemoProps {
  const values: DemoProps = {};

  for (const prop of meta.props) {
    if (prop.example === null) continue;

    if (prop.controlled && !prop.handler) continue;

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

export function resolveIcons(value: unknown): unknown {
  const marker = iconMarker(value);
  if (marker) {
    const Icon = EXAMPLE_ICONS[marker.name];
    return Icon ? <Icon className={marker.size ?? "w:6 h:6"} /> : undefined;
  }
  if (Array.isArray(value)) return value.map(resolveIcons);
  if (typeof value === "object" && value !== null) {
    if ("$$typeof" in value) return value;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveIcons(item)]),
    );
  }
  return value;
}

const CHILD_COMPONENTS: Record<string, ComponentType<DemoProps>> = {
  Avatar,
  Button,
  Checkbox,
  Toggle,
};

export function exampleChildren(meta: RegistryMeta): ReactNode {
  if (!meta.childrenExample) return meta.children;

  return meta.childrenExample.map((child, index) => {
    if (child.text !== undefined) {
      // biome-ignore lint/suspicious/noArrayIndexKey: position is the identity here
      return <span key={index}>{child.text}</span>;
    }
    const Child = child.component ? CHILD_COMPONENTS[child.component] : null;
    if (!Child) return null;
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: position is the identity here
      <Child key={index} {...(resolveIcons(child.props ?? {}) as DemoProps)}>
        {child.children}
      </Child>
    );
  });
}
