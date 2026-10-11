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
          <Tooltip.Positioner side="bottom" sideOffset={10}>
            <Tooltip.Popup className="p:r px:2 py:1 bc:border bg:surface c:ink bw:1 fs:xs us:none">
              <Tooltip.Arrow className="d:f" style={{ top: -5 }}>
                <svg
                  viewBox="0 0 10 5"
                  width="12"
                  height="6"
                  aria-hidden="true"
                >
                  <path
                    d="M0 5 L5 0 L10 5"
                    strokeWidth="1"
                    className="f:surface s:border"
                  />
                </svg>
              </Tooltip.Arrow>
              {label}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
