import { Popover } from "@base-ui/react/popover";
import { BellNotification } from "iconoir-react";

export default function PopoverStatic() {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={(state) =>
          `d-f ai-c jc-c w-10 h-10 bw-1 bc-silver-2 br-lg bg-white c-slate-10 us-none c-p fv:oo-2 fv:oc-indigo-5 ${
            state.open ? "bg-silver-1 h:bg-silver-1" : "h:bg-silver-1"
          }`
        }
      >
        <BellNotification aria-label="Notifications" className="w-5 h-5" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="px-4 py-3 w-56 bg-white bc-silver-2 c-slate-10 bw-1 br-lg bs-o-xs">
            <Popover.Title className="m-0 mb-1 c-slate-10 fs-sm fw-500">
              Notifications
            </Popover.Title>
            <Popover.Description className="m-0 c-slate-8 fs-xs">
              Review your recent alerts and updates.
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
