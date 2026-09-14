

export const registry = {
  "accordion": () => import("./ui/accordion"),
  "alert-dialog": () => import("./ui/alert-dialog"),
  "autocomplete-grouped": () => import("./ui/autocomplete-grouped"),
  "autocomplete-helper": () => import("./ui/autocomplete-helper"),
  "autocomplete-icon-leading": () => import("./ui/autocomplete-icon-leading"),
  "autocomplete-icon-trailing": () => import("./ui/autocomplete-icon-trailing"),
  "autocomplete": () => import("./ui/autocomplete"),
  "avatar-icon-fallback": () => import("./ui/avatar-icon-fallback"),
  "avatar-initial-fallback": () => import("./ui/avatar-initial-fallback"),
  "avatar-stack-compact": () => import("./ui/avatar-stack-compact"),
  "avatar-stack": () => import("./ui/avatar-stack"),
  "avatar": () => import("./ui/avatar"),
  "badge": () => import("./ui/badge"),
  "breadcrumb": () => import("./ui/breadcrumb"),
  "button-group": () => import("./ui/button-group"),
  "button": () => import("./ui/button"),
  "checkbox-group": () => import("./ui/checkbox-group"),
  "checkbox": () => import("./ui/checkbox"),
  "combobox-grouped": () => import("./ui/combobox-grouped"),
  "combobox-helper": () => import("./ui/combobox-helper"),
  "combobox": () => import("./ui/combobox"),
  "command-palette": () => import("./ui/command-palette"),
  "context-menu": () => import("./ui/context-menu"),
  "dialog": () => import("./ui/dialog"),
  "empty-state": () => import("./ui/empty-state"),
  "field-prefix": () => import("./ui/field-prefix"),
  "field-suffix": () => import("./ui/field-suffix"),
  "field": () => import("./ui/field"),
  "file-upload": () => import("./ui/file-upload"),
  "menu": () => import("./ui/menu"),
  "menubar": () => import("./ui/menubar"),
  "meter": () => import("./ui/meter"),
  "number-field": () => import("./ui/number-field"),
  "onboarding": () => import("./ui/onboarding"),
  "popover": () => import("./ui/popover"),
  "preview-card": () => import("./ui/preview-card"),
  "progress": () => import("./ui/progress"),
  "radio": () => import("./ui/radio"),
  "rating": () => import("./ui/rating"),
  "select-grouped": () => import("./ui/select-grouped"),
  "select": () => import("./ui/select"),
  "separator": () => import("./ui/separator"),
  "skeleton-activity": () => import("./ui/skeleton-activity"),
  "skeleton-filters": () => import("./ui/skeleton-filters"),
  "skeleton-list": () => import("./ui/skeleton-list"),
  "skeleton-stats": () => import("./ui/skeleton-stats"),
  "skeleton": () => import("./ui/skeleton"),
  "slider": () => import("./ui/slider"),
  "switch": () => import("./ui/switch"),
  "tabs": () => import("./ui/tabs"),
  "textarea": () => import("./ui/textarea"),
  "toggle-group": () => import("./ui/toggle-group"),
  "toggle": () => import("./ui/toggle"),
  "toolbar": () => import("./ui/toolbar"),
  "tooltip": () => import("./ui/tooltip"),
} as const;

export type RegistryId = keyof typeof registry;
export type RegistryImport = () => Promise<{ default: React.ComponentType<object> }>;

export function getRegistryImport(id: string): RegistryImport | null {
  return (registry as Record<string, RegistryImport>)[id] ?? null;
}

export interface RegistryProp {
  name: string;
  type: "enum" | "boolean" | "string" | "number" | "none";
  typeName?: string;
  values?: string[];
  min?: number;
  max?: number;
  step?: number;
  default?: string | boolean | number;
  example?: unknown;
  exampleIcon?: string;
  optional?: boolean;
  dependsOn?: string;
  handler?: string;
  conflictsWith?: {
    prop: string;
    is?: unknown;
    not?: unknown;
    set?: boolean;
  }[];
  controlled?: boolean;
  description?: string;
}

export interface RegistryMeta {
  summary?: string;
  props: RegistryProp[];
  children?: string;
  childrenExample?: {
    component?: string;
    props?: Record<string, unknown>;
    children?: string;
    text?: string;
  }[];
}

export const registryMeta = {
  "accordion": () => import("./meta/accordion.json"),
  "alert-dialog": () => import("./meta/alert-dialog.json"),
  "autocomplete": () => import("./meta/autocomplete.json"),
  "avatar-stack": () => import("./meta/avatar-stack.json"),
  "avatar": () => import("./meta/avatar.json"),
  "badge": () => import("./meta/badge.json"),
  "breadcrumb": () => import("./meta/breadcrumb.json"),
  "button-group": () => import("./meta/button-group.json"),
  "button": () => import("./meta/button.json"),
  "checkbox-group": () => import("./meta/checkbox-group.json"),
  "checkbox": () => import("./meta/checkbox.json"),
  "combobox": () => import("./meta/combobox.json"),
  "command-palette": () => import("./meta/command-palette.json"),
  "context-menu": () => import("./meta/context-menu.json"),
  "dialog": () => import("./meta/dialog.json"),
  "empty-state": () => import("./meta/empty-state.json"),
  "field": () => import("./meta/field.json"),
  "file-upload": () => import("./meta/file-upload.json"),
  "menu": () => import("./meta/menu.json"),
  "menubar": () => import("./meta/menubar.json"),
  "meter": () => import("./meta/meter.json"),
  "number-field": () => import("./meta/number-field.json"),
  "onboarding": () => import("./meta/onboarding.json"),
  "popover": () => import("./meta/popover.json"),
  "preview-card": () => import("./meta/preview-card.json"),
  "progress": () => import("./meta/progress.json"),
  "radio": () => import("./meta/radio.json"),
  "rating": () => import("./meta/rating.json"),
  "select": () => import("./meta/select.json"),
  "separator": () => import("./meta/separator.json"),
  "skeleton": () => import("./meta/skeleton.json"),
  "slider": () => import("./meta/slider.json"),
  "switch": () => import("./meta/switch.json"),
  "tabs": () => import("./meta/tabs.json"),
  "textarea": () => import("./meta/textarea.json"),
  "toggle-group": () => import("./meta/toggle-group.json"),
  "toggle": () => import("./meta/toggle.json"),
  "toolbar": () => import("./meta/toolbar.json"),
  "tooltip": () => import("./meta/tooltip.json"),
} as const;

export type MetaImport = () => Promise<{ default: RegistryMeta }>;

export function getRegistryMeta(id: string): MetaImport | null {
  return (registryMeta as Record<string, MetaImport>)[id] ?? null;
}

export interface RegistryTarget {
  component: string;
  variant: string;
  kind: "component" | "block" | "example";
  install: string;
}

export const registryTargets: Record<string, RegistryTarget> = {
  "accordion": { component: "accordion", variant: "base", kind: "component", install: "accordion" },
  "alert-dialog": { component: "alert-dialog", variant: "base", kind: "component", install: "alert-dialog" },
  "autocomplete-grouped": { component: "autocomplete", variant: "grouped", kind: "example", install: "autocomplete" },
  "autocomplete-helper": { component: "autocomplete", variant: "helper", kind: "example", install: "autocomplete" },
  "autocomplete-icon-leading": { component: "autocomplete", variant: "icon-leading", kind: "example", install: "autocomplete" },
  "autocomplete-icon-trailing": { component: "autocomplete", variant: "icon-trailing", kind: "example", install: "autocomplete" },
  "autocomplete": { component: "autocomplete", variant: "base", kind: "component", install: "autocomplete" },
  "avatar-icon-fallback": { component: "avatar", variant: "icon-fallback", kind: "example", install: "avatar" },
  "avatar-initial-fallback": { component: "avatar", variant: "initial-fallback", kind: "example", install: "avatar" },
  "avatar-stack-compact": { component: "avatar-stack", variant: "compact", kind: "example", install: "avatar-stack" },
  "avatar-stack": { component: "avatar-stack", variant: "base", kind: "component", install: "avatar-stack" },
  "avatar": { component: "avatar", variant: "base", kind: "component", install: "avatar" },
  "badge": { component: "badge", variant: "base", kind: "component", install: "badge" },
  "breadcrumb": { component: "breadcrumb", variant: "base", kind: "component", install: "breadcrumb" },
  "button-group": { component: "button-group", variant: "base", kind: "component", install: "button-group" },
  "button": { component: "button", variant: "base", kind: "component", install: "button" },
  "checkbox-group": { component: "checkbox-group", variant: "base", kind: "component", install: "checkbox-group" },
  "checkbox": { component: "checkbox", variant: "base", kind: "component", install: "checkbox" },
  "combobox-grouped": { component: "combobox", variant: "grouped", kind: "example", install: "combobox" },
  "combobox-helper": { component: "combobox", variant: "helper", kind: "example", install: "combobox" },
  "combobox": { component: "combobox", variant: "base", kind: "component", install: "combobox" },
  "command-palette": { component: "command-palette", variant: "base", kind: "component", install: "command-palette" },
  "context-menu": { component: "context-menu", variant: "base", kind: "component", install: "context-menu" },
  "dialog": { component: "dialog", variant: "base", kind: "component", install: "dialog" },
  "empty-state": { component: "empty-state", variant: "base", kind: "component", install: "empty-state" },
  "field-prefix": { component: "field", variant: "prefix", kind: "example", install: "field" },
  "field-suffix": { component: "field", variant: "suffix", kind: "example", install: "field" },
  "field": { component: "field", variant: "base", kind: "component", install: "field" },
  "file-upload": { component: "file-upload", variant: "base", kind: "component", install: "file-upload" },
  "menu": { component: "menu", variant: "base", kind: "component", install: "menu" },
  "menubar": { component: "menubar", variant: "base", kind: "component", install: "menubar" },
  "meter": { component: "meter", variant: "base", kind: "component", install: "meter" },
  "number-field": { component: "number-field", variant: "base", kind: "component", install: "number-field" },
  "onboarding": { component: "onboarding", variant: "base", kind: "component", install: "onboarding" },
  "popover": { component: "popover", variant: "base", kind: "component", install: "popover" },
  "preview-card": { component: "preview-card", variant: "base", kind: "component", install: "preview-card" },
  "progress": { component: "progress", variant: "base", kind: "component", install: "progress" },
  "radio": { component: "radio", variant: "base", kind: "component", install: "radio" },
  "rating": { component: "rating", variant: "base", kind: "component", install: "rating" },
  "select-grouped": { component: "select", variant: "grouped", kind: "example", install: "select" },
  "select": { component: "select", variant: "base", kind: "component", install: "select" },
  "separator": { component: "separator", variant: "base", kind: "component", install: "separator" },
  "skeleton-activity": { component: "skeleton", variant: "activity", kind: "example", install: "skeleton" },
  "skeleton-filters": { component: "skeleton", variant: "filters", kind: "example", install: "skeleton" },
  "skeleton-list": { component: "skeleton", variant: "list", kind: "example", install: "skeleton" },
  "skeleton-stats": { component: "skeleton", variant: "stats", kind: "example", install: "skeleton" },
  "skeleton": { component: "skeleton", variant: "base", kind: "component", install: "skeleton" },
  "slider": { component: "slider", variant: "base", kind: "component", install: "slider" },
  "switch": { component: "switch", variant: "base", kind: "component", install: "switch" },
  "tabs": { component: "tabs", variant: "base", kind: "component", install: "tabs" },
  "textarea": { component: "textarea", variant: "base", kind: "component", install: "textarea" },
  "toggle-group": { component: "toggle-group", variant: "base", kind: "component", install: "toggle-group" },
  "toggle": { component: "toggle", variant: "base", kind: "component", install: "toggle" },
  "toolbar": { component: "toolbar", variant: "base", kind: "component", install: "toolbar" },
  "tooltip": { component: "tooltip", variant: "base", kind: "component", install: "tooltip" },
};

export function getRegistryTarget(id: string): RegistryTarget {
  return (
    registryTargets[id] ?? {
      component: id,
      variant: "base",
      kind: "component",
      install: id,
    }
  );
}
