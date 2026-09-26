"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import {
  AltArrowRightIcon,
  CheckIcon,
  CommandIcon,
} from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";

const CONTEXT_MENU_MOTION = `
  .yui-context-menu-pop {
    transition: opacity 150ms ease-out;
  }
  .yui-context-menu-pop[data-starting-style],
  .yui-context-menu-pop[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-context-menu-pop { transition: none; }
  }
`;

const TRIGGER_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl cs:s",
  square: "",
  squircle: "br:xxl cs:s",
};

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:3xl cs:s",
};

const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:xxl cs:s",
};

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

export interface ContextMenuAction {
  type?: "item";
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ContextMenuSeparator {
  type: "separator";
}

export interface ContextMenuGroup {
  type: "group";
  label?: string;
  items: ContextMenuItem[];
}

export interface ContextMenuCheckbox {
  type: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface ContextMenuRadio {
  type: "radio";
  value: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
}

export interface ContextMenuSubmenu {
  type: "submenu";
  label: string;
  items: ContextMenuItem[];
}

export type ContextMenuItem =
  | ContextMenuAction
  | ContextMenuSeparator
  | ContextMenuGroup
  | ContextMenuCheckbox
  | ContextMenuRadio
  | ContextMenuSubmenu;

export interface ContextMenuProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /** The right-clickable area's label. */
  trigger: ReactNode;
  /**
   * A discriminated union. `{ label }` is a plain action (plus optional `icon`,
   * `shortcut`, `destructive`, `disabled`, `onClick`). `{ type: "separator" }`
   * divides. `{ type: "group", label?, items }` wraps a `role="group"` block
   * under a heading. `{ type: "checkbox", label, checked, onCheckedChange }`
   * and `{ type: "radio", value, onValueChange, options }` are the stateful
   * kinds. `{ type: "submenu", label, items }` nests, recursively.
   */
  items: ContextMenuItem[];
  /**
   * Corner radius on the trigger, popup and items together. `squircle` steps
   * the popup & item radius up one and adds `corner-shape`.
   */
  shape?: Shape;
  /** Depth on both the trigger and the popup. */
  shadow?: Shadow;
  /**
   * Which end of an item its `icon` sits at. A `shortcut` always trails
   * regardless.
   */
  iconPosition?: IconPosition;
  /** Blocks the menu from opening at all & dims the trigger. */
  disabled?: boolean;
  /**
   * Controlled state. There is no `defaultOpen` - a context menu that starts
   * open before anyone right-clicks was never demonstrated & makes no sense.
   */
  open?: boolean;
  /** Called with the new state. Required for a controlled menu. */
  onOpenChange?: (open: boolean) => void;
  /**
   * The popup's fade in/out. Turn it off for an instant appearance, or when the
   * user has asked for reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * A right-click menu built from an item list: actions, checkboxes, radios,
 * groups, separators and nested submenus.
 */
export default function ContextMenuBase({
  trigger,
  items,
  shape = "square",
  shadow = "none",
  iconPosition = "leading",
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  animated = true,
  className,
  container,
}: ContextMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const handleOpenChange = (next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!disabled || !open) return;
    setInternalOpen(false);
    onOpenChange?.(false);
  }, [disabled, open, onOpenChange]);

  const shadowClass =
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "";

  const triggerClasses = merge(
    "d:f ai:c jc:c h:48 w:60 bg:white bs:d bw:1 fs:sm fw:500 us:none",
    TRIGGER_SHAPES[shape],
    disabled
      ? "bg:silver-1 bc:silver-2 c:slate-4 c:na"
      : "bc:slate-3 c:slate-10",
    className,
  );

  const popupClasses = [
    "py:1 w:52 bg:white bc:silver-2 c:slate-10 bw:1 os:none",
    POPUP_SHAPES[shape],
    shadowClass,
  ]
    .filter(Boolean)
    .join(" ");

  const itemClasses =
    (destructive: boolean, spread: boolean) =>
    (state: { highlighted: boolean }) =>
      [
        "d:f ai:c g:2 py:2 pl:2 pr:3 fs:sm fw:500 us:none c:p mx:1 os:none",
        spread ? "jc:sb" : "",
        ITEM_SHAPES[shape],
        destructive ? "c:red" : "",
        state.highlighted
          ? destructive
            ? "bg:red-1/50"
            : "bg:silver-2/50"
          : "bg:transparent",
      ]
        .filter(Boolean)
        .join(" ");

  const renderItems = (list: ContextMenuItem[], keyPrefix: string) =>
    list.map((item, index) => {
      const key = `${keyPrefix}-${index}`;

      if ("type" in item && item.type === "separator") {
        return (
          <ContextMenu.Separator
            key={key}
            className="my:1 w:100% h:px bg:silver-2"
          />
        );
      }

      if ("type" in item && item.type === "group") {
        return (
          <ContextMenu.Group key={key}>
            {item.label && (
              <div className="px:3 py:1 fs:xs fw:600 c:slate-5 us:none">
                {item.label}
              </div>
            )}
            {renderItems(item.items, key)}
          </ContextMenu.Group>
        );
      }

      if ("type" in item && item.type === "checkbox") {
        return (
          <ContextMenu.CheckboxItem
            key={key}
            checked={item.checked}
            onCheckedChange={item.onCheckedChange}
            disabled={item.disabled}
            className={itemClasses(false, false)}
          >
            <span className="d:f ai:c jc:c fs:0 w:4 h:4 bc:silver-3 br:sm bw:1">
              <ContextMenu.CheckboxItemIndicator>
                <CheckIcon className="w:3 h:3 c:slate-12" />
              </ContextMenu.CheckboxItemIndicator>
            </span>
            {item.label}
          </ContextMenu.CheckboxItem>
        );
      }

      if ("type" in item && item.type === "radio") {
        return (
          <ContextMenu.RadioGroup
            key={key}
            value={item.value}
            onValueChange={item.onValueChange}
          >
            {item.options.map((option) => (
              <ContextMenu.RadioItem
                key={option.value}
                value={option.value}
                className={itemClasses(false, false)}
              >
                <span className="d:f ai:c jc:c fs:0 w:4 h:4 bc:silver-3 br:9999 bw:1">
                  <ContextMenu.RadioItemIndicator>
                    <span className="d:b w:2 h:2 br:9999 bg:current c:slate-12" />
                  </ContextMenu.RadioItemIndicator>
                </span>
                {option.label}
              </ContextMenu.RadioItem>
            ))}
          </ContextMenu.RadioGroup>
        );
      }

      if ("type" in item && item.type === "submenu") {
        return (
          <ContextMenu.SubmenuRoot key={key}>
            <ContextMenu.SubmenuTrigger className={itemClasses(false, true)}>
              <span className="fg:1">{item.label}</span>
              <AltArrowRightIcon className="fs:0 w:4 h:4 c:slate-4" />
            </ContextMenu.SubmenuTrigger>

            <ContextMenu.Portal container={container}>
              <ContextMenu.Positioner
                className="ow:0"
                sideOffset={-4}
                alignOffset={-4}
              >
                <ContextMenu.Popup className={popupClasses}>
                  {renderItems(item.items, key)}
                </ContextMenu.Popup>
              </ContextMenu.Positioner>
            </ContextMenu.Portal>
          </ContextMenu.SubmenuRoot>
        );
      }

      const action = item as ContextMenuAction;
      const destructive = Boolean(action.destructive);

      const trailing =
        Boolean(action.shortcut) ||
        (Boolean(action.icon) && iconPosition === "trailing");

      return (
        <ContextMenu.Item
          key={key}
          disabled={action.disabled}
          onClick={action.onClick}
          className={itemClasses(destructive, trailing)}
        >
          {action.icon && iconPosition === "leading" && (
            <span className="d:f fs:0 c:slate-5">{action.icon}</span>
          )}
          {trailing ? (
            <span className="fg:1">{action.label}</span>
          ) : (
            action.label
          )}
          {action.icon && iconPosition === "trailing" && (
            <span className="d:f fs:0 c:slate-5">{action.icon}</span>
          )}
          {action.shortcut && (
            <span
              className={[
                "d:f ai:c g:1 ml:4 fw:400 fs:xs",
                destructive ? "c:red" : "c:slate-6",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <CommandIcon className="w:3 h:3" />
              <span>{action.shortcut}</span>
            </span>
          )}
        </ContextMenu.Item>
      );
    });

  const popup = (
    <ContextMenu.Portal container={container} keepMounted>
      <ContextMenu.Positioner className="ow:0">
        <ContextMenu.Popup
          className={`${popupClasses} ${animated ? "yui-context-menu-pop" : ""}`}
        >
          {renderItems(items, "item")}
        </ContextMenu.Popup>
      </ContextMenu.Positioner>
    </ContextMenu.Portal>
  );

  return (
    <ContextMenu.Root
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
    >
      <style href="yumma-ui-context-menu-motion" precedence="default">
        {CONTEXT_MENU_MOTION}
      </style>
      <ContextMenu.Trigger className={triggerClasses}>
        {trigger}
      </ContextMenu.Trigger>

      {popup}
    </ContextMenu.Root>
  );
}
