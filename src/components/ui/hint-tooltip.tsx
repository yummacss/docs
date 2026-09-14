"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import type { ReactElement } from "react";

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
