"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import type { ReactElement } from "react";

/**
 * The docs site's own tooltip, for the icon-only controls in the page chrome.
 * `title` is the browser's version of this and cannot be styled, delayed or
 * placed; the accessible name stays on the trigger's `aria-label` either way.
 */
export default function HintTooltip({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) {
  return (
    <Tooltip.Provider delay={400}>
      <Tooltip.Root>
        <Tooltip.Trigger render={children} />
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom" sideOffset={6}>
            <Tooltip.Popup className="px-2 py-1 br-md bc-border bg-surface c-white bw-1 fs-xs us-none">
              {label}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
