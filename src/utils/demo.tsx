import {
  ArchiveIcon,
  BellIcon,
  BookmarkIcon,
  ClockCircleIcon,
  CloudIcon,
  CopyIcon,
  DocumentAddIcon,
  DocumentIcon,
  FileLeftIcon,
  FileRightIcon,
  FolderIcon,
  GalleryIcon,
  KeyboardIcon,
  LaptopIcon,
  ListIcon,
  MagnifierIcon as MagnifierDuotoneIcon,
  MonitorIcon,
  MoonIcon,
  MoveToFolderIcon,
  PaletteIcon,
  PenIcon,
  PinIcon,
  SettingsIcon,
  SmartphoneIcon,
  SortIcon,
  StarIcon,
  StarsIcon,
  SunIcon,
  TabletIcon,
  TrashBinTrashIcon,
  VideoFrameIcon,
} from "@solar-icons/react/bold-duotone";
import {
  AddIcon,
  AltArrowDownIcon,
  CheckIcon,
  Columns3Icon,
  DownloadIcon,
  Grid2x2Icon,
  LinkIcon,
  MagnifierIcon,
  MenuDotsIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  UndoLeftIcon,
  UndoRightIcon,
} from "@solar-icons/react/outline";
import { type ComponentType, Fragment, type ReactNode } from "react";
import {
  type ChildExample,
  getRegistryMeta,
  type RegistryMeta,
} from "@/registry";
import Avatar from "@/registry/ui/avatar";
import Button from "@/registry/ui/button";
import Checkbox from "@/registry/ui/checkbox";
import Toggle from "@/registry/ui/toggle";
import { EXAMPLE_ICON_STYLE, type IconStyle } from "@/utils/icon-style";
import { componentId, iconMarker } from "@/utils/snippet";
import { styleProps } from "@/utils/styles.mjs";

export type DemoProps = Record<string, unknown>;

type IconComponent = ComponentType<{ className?: string }>;

export const EXAMPLE_ICONS: Record<IconStyle, Record<string, IconComponent>> = {
  "bold-duotone": {
    CloudIcon,
    ClockCircleIcon,
    GalleryIcon,
    VideoFrameIcon,
    ArchiveIcon,
    BellIcon,
    BookmarkIcon,
    CopyIcon,
    DocumentAddIcon,
    DocumentIcon,
    FileLeftIcon,
    FileRightIcon,
    FolderIcon,
    KeyboardIcon,
    LaptopIcon,
    ListIcon,
    MonitorIcon,
    MoonIcon,
    MoveToFolderIcon,
    PaletteIcon,
    PenIcon,
    PinIcon,
    SettingsIcon,
    SmartphoneIcon,
    SortIcon,
    StarIcon,
    StarsIcon,
    SunIcon,
    TabletIcon,
    TrashBinTrashIcon,
    MagnifierIcon: MagnifierDuotoneIcon,
  },
  outline: {
    AltArrowDownIcon,
    DownloadIcon,
    LinkIcon,
    UndoLeftIcon,
    UndoRightIcon,
    AddIcon,
    CheckIcon,
    Columns3Icon,
    Grid2x2Icon,
    MagnifierIcon,
    MenuDotsIcon,
    TextBoldIcon,
    TextItalicIcon,
    TextUnderlineIcon,
  },
};

// a marker can ask for a style; otherwise the icon's own
function iconComponent(name: string, style?: IconStyle) {
  return EXAMPLE_ICONS[style ?? EXAMPLE_ICON_STYLE[name] ?? "outline"][name];
}

export function exampleIcon(name: string) {
  const Icon = iconComponent(name);
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
    const Icon = iconComponent(marker.name, marker.style);
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
  return meta.childrenExample.map((child, index) => renderChild(child, index));
}

/** The registry ids a scene names, so they can load before it renders. */
export function sceneIds(scene: ChildExample[]): string[] {
  const ids = new Set<string>();
  const walk = (nodes: ChildExample[]) => {
    for (const node of nodes) {
      if (node.component) ids.add(componentId(node.component));
      if (Array.isArray(node.children)) walk(node.children);
    }
  };
  walk(scene);
  return [...ids];
}

/** The Example view, with the rail's style & radius on every component in it. */
export function renderScene(
  scene: ChildExample[],
  components: Record<string, ComponentType<DemoProps>>,
  style: string,
  radius: string,
  container: unknown,
): ReactNode {
  const styled = (component: string) => {
    const meta = getRegistryMeta(componentId(component));
    if (!meta) return {};
    const portals = meta.props.some((prop) => prop.name === "container");
    return {
      ...styleProps(meta.props, style, radius),
      ...(portals ? { container } : {}),
    };
  };
  return scene.map((child, index) =>
    renderChild(child, index, styled, components),
  );
}

// position is the identity of a demo's child, so it is the key
function renderChild(
  child: ChildExample,
  index: number,
  styled?: (component: string) => DemoProps,
  components?: Record<string, ComponentType<DemoProps>>,
): ReactNode {
  const inner =
    typeof child.children === "string"
      ? child.children
      : child.children?.map((node, at) =>
          renderChild(node, at, styled, components),
        );

  if (child.icon !== undefined) {
    return (
      <Fragment key={index}>{resolveIcons(child.icon) as ReactNode}</Fragment>
    );
  }
  if (child.text !== undefined) {
    return (
      <span key={index} className={child.className}>
        {child.text}
      </span>
    );
  }
  if (child.tag) {
    const Tag = child.tag;
    return (
      <Tag key={index} className={child.className}>
        {inner}
      </Tag>
    );
  }
  const Child = child.component
    ? (components?.[componentId(child.component)] ??
      CHILD_COMPONENTS[child.component])
    : null;
  if (!Child) return null;
  return (
    <Child
      key={index}
      {...(styled && child.component ? styled(child.component) : {})}
      {...(resolveIcons(child.props ?? {}) as DemoProps)}
      {...(child.className ? { className: child.className } : {})}
    >
      {inner}
    </Child>
  );
}
