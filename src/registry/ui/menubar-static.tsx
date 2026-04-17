"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";

export default function MenubarStatic() {
  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          File
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={6}>
            <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-lg">
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>New project</Menu.Item>
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Open file</Menu.Item>
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Save</Menu.Item>
              <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Print</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Edit
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={6}>
            <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-lg">
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Undo action</Menu.Item>
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Redo action</Menu.Item>
              <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Cut selection</Menu.Item>
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Copy text</Menu.Item>
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Paste content</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p b-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          View
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={6}>
            <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-lg">
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Zoom in</Menu.Item>
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Zoom out</Menu.Item>
              <Menu.Separator className="my-1 w-full h-px bg-silver-2" />
              <Menu.Item className={(state) => `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`}>Full screen</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 px-3 bg-transparent c-slate-10 br-lg fs-sm fw-500 o-50 us-none">
          Help
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}
