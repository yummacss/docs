"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import { BellDot } from "iconoir-react";

export default function TooltipStatic() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger className="d-f ai-c jc-c bg-transparent c-slate-8 bw-0 c-p h:c-slate-12 fv:oo-2 fv:oc-indigo-5">
          <BellDot aria-label="Notifications" className="w-6 h-6" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8} className="zi-50">
            <Tooltip.Popup className="px-3 py-2 bg-white bc-silver-2 c-slate-10 bw-1 br-md fs-sm bs-o-xs us-none">
              3 unread notifications
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
