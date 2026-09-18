"use client";

import { Button } from "@base-ui/react/button";
import { Combobox } from "@base-ui/react/combobox";
import { Dialog } from "@base-ui/react/dialog";
import { Search } from "iconoir-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Shadow = "none" | "inset" | "outset";
type IconPosition = "leading" | "trailing";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:silver-3/60 fv:bc:silver-5";

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:3xl cs:s",
};

const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const PALETTE_MOTION = `
  .yui-palette-pop {
    transition: opacity 200ms ease-out, scale 200ms ease-out;
  }
  .yui-palette-pop[data-starting-style],
  .yui-palette-pop[data-ending-style] {
    opacity: 0;
    scale: 0.95;
  }
  .yui-palette-fade {
    transition: opacity 200ms ease-out;
  }
  .yui-palette-fade[data-starting-style],
  .yui-palette-fade[data-ending-style] {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .yui-palette-pop,
    .yui-palette-fade { transition: none; }
  }
`;

const SHADOWS: Record<Exclude<Shadow, "none">, string> = {
  inset: "bs-i:3xl",
  outset: "bs-o:sm",
};

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  icon?: ReactNode;
  onSelect?: () => void;
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /** The trigger button's label. A search glyph is always drawn beside it. */
  trigger: ReactNode;
  /**
   * Each group's `label` and its `items`. An item takes `id`, `label`, and
   * optional `description`, `shortcut`, `icon` and `onSelect`. A divider is
   * drawn between groups automatically.
   */
  groups: CommandGroup[];
  /** The search input's placeholder. */
  placeholder?: string;
  /** Shown when the query matches nothing. */
  emptyMessage?: string;
  /**
   * Which end of an item its `icon` sits at. A `shortcut` always trails
   * regardless.
   */
  iconPosition?: IconPosition;
  /** Corner radius on the trigger, the popup and its items. */
  shape?: Shape;
  /** Depth on the popup. */
  shadow?: Shadow;
  /**
   * The backdrop's fade and the popup's scale-in. Turn it off for an instant
   * palette, or when the user has asked for reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
  /**
   * The focus outline. `true` draws it, `false` removes it along with the
   * danger, error and success tints that ride with it, and a string of Yumma
   * CSS utilities restyles it on every focusable part of the component, which
   * is more than `className` reaches. Removing it outright and putting nothing
   * back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
}

/**
 * A searchable command dialog, grouped, with optional per-item descriptions,
 * shortcuts and icons.
 */
export default function CommandPaletteBase({
  trigger,
  groups,
  placeholder = "Search commands…",
  emptyMessage = "No commands found.",
  iconPosition = "leading",
  shape = "square",
  shadow = "none",
  animated = true,
  className,
  focus = true,
  container,
}: CommandPaletteProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [open, setOpen] = useState(false);

  const triggerClasses = merge(
    outline,
    "bg:white d:f ai:c g:2 px:3 py:2 bc:silver-2 c:slate-10 bw:1 fw:500 tp:c tdu:150 ttf:io us:none",
    ITEM_SHAPES[shape],
    className,
  );

  const popupClasses = [
    "o:h w:96 bg:white bc:silver-2 c:slate-10 bw:1",
    POPUP_SHAPES[shape],
    shadow === "inset" || shadow === "outset" ? SHADOWS[shadow] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const itemClasses = (spread: boolean) => (state: { highlighted: boolean }) =>
    [
      "d:f ai:c g:2 py:2 px:2 mx:2 fs:sm us:none c:p",
      spread ? "jc:sb" : "",
      ITEM_SHAPES[shape],
      state.highlighted ? "bg:silver-2/50" : "bg:transparent",
    ]
      .filter(Boolean)
      .join(" ");

  const popup = (
    <Dialog.Portal container={container} keepMounted>
      <Dialog.Backdrop
        className={`p:f i:0 min-h:dvh bg:black/5 bf-b:xs ${animated ? "yui-palette-fade" : ""}`}
      />
      <Dialog.Viewport className="d:f p:f i:0 ai:c jc:c">
        <Dialog.Popup
          className={`${popupClasses} ${animated ? "yui-palette-pop" : ""}`}
          style={{ maxWidth: "90vw" }}
        >
          <Combobox.Root inline items={groups} autoHighlight>
            <div className="d:f ai:c g:2 px:4 py:1">
              <Search className="fs:0 w:5 h:5 c:slate-4" />
              <Combobox.Input
                placeholder={placeholder}
                autoFocus
                className="h:10 w:100% bg:transparent c:slate-10 fs:md"
              />
            </div>
            <div className="w:100% h:px bg:silver-2" />
            <div>
              <Combobox.List className="oy:auto max-h:72 py:1 ow:0">
                {(group: CommandGroup, groupIndex: number) => (
                  <Combobox.Group key={group.label}>
                    <div className="px:4 pt:2 pb:1 c:slate-5 fs:xs fw:500">
                      {group.label}
                    </div>
                    {group.items.map((item) => {
                      const trailing =
                        Boolean(item.shortcut) ||
                        (Boolean(item.icon) && iconPosition === "trailing");

                      return (
                        <Combobox.Item
                          key={item.id}
                          value={item.id}
                          onClick={() => {
                            item.onSelect?.();
                            setOpen(false);
                          }}
                          className={itemClasses(trailing)}
                        >
                          {item.icon && iconPosition === "leading" && (
                            <span className="d:f fs:0 c:slate-5">
                              {item.icon}
                            </span>
                          )}

                          <span className="d:f fd:c fg:1">
                            <span className="c:slate-10 fw:500">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="c:slate-5 fs:xs">
                                {item.description}
                              </span>
                            )}
                          </span>

                          {item.icon && iconPosition === "trailing" && (
                            <span className="d:f fs:0 c:slate-5">
                              {item.icon}
                            </span>
                          )}
                          {item.shortcut && (
                            <span className="d:f ai:c g:1 px:1 py:1 ml:3 bc:silver-2 bw:1 c:slate-5 br:md fs:xs us:none">
                              {item.shortcut}
                            </span>
                          )}
                        </Combobox.Item>
                      );
                    })}
                    {groupIndex < groups.length - 1 && (
                      <div className="w:100% h:px my:1 bg:silver-2" />
                    )}
                  </Combobox.Group>
                )}
              </Combobox.List>
              <Combobox.Empty className="c:slate-6 fs:sm">
                <div className="py:8 px:4 ta:c fs:sm">{emptyMessage}</div>
              </Combobox.Empty>
            </div>
          </Combobox.Root>
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <style href="yumma-ui-command-palette-motion" precedence="default">
        {PALETTE_MOTION}
      </style>
      <Dialog.Trigger render={<Button className={triggerClasses} />}>
        <Search className="w:4 h:4" />
        <span>{trigger}</span>
      </Dialog.Trigger>

      {popup}
    </Dialog.Root>
  );
}
