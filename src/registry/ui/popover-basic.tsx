"use client";

import { Popover } from "@base-ui/react/popover";
import { BellIcon } from "@phosphor-icons/react";

export default function ExamplePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger className="d-f ai-c jc-c d-10 bw-1 bc-silver-4 br-1 bg-silver-1 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 popover-trigger">
        <BellIcon size={20} aria-label="Notifications" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="bw-1 bc-silver-4 br-1 bg-white bs-md px-6 py-4 c-slate popover-popup">
            <Popover.Title className="fs-md fw-500 ff-s">
              Notifications
            </Popover.Title>
            <Popover.Description className="fs-md c-slate-6">
              You are all caught up. Good job!
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>

      <style>{`
        .popover-trigger[data-popup-open] {
          background-color: var(--silver-2);
        }
        .popover-popup {
          transform-origin: var(--transform-origin);
          transition: transform 150ms, opacity 150ms;
        }
        .popover-popup[data-starting-style],
        .popover-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.9);
        }
      `}</style>
    </Popover.Root>
  );
}
