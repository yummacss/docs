"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import type { ReactElement } from "react";

/** A short label under a control; the control keeps its own aria-label. */
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
          <Tooltip.Positioner side="bottom" sideOffset={18}>
            <Tooltip.Popup className="p:r px:2 py:1 bc:border bg:surface c:ink bw:1 fs:xs us:none">
              {/* A square turned 45deg: its top and left edges are the chevron,
                  and its fill covers the popup's border underneath. */}
              <Tooltip.Arrow
                className="w:2 h:2 bc:border bg:surface btw:1 blw:1"
                style={{ top: -5, transform: "rotate(45deg)" }}
              />
              {label}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
