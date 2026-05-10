"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";

export default function MenubarStatic() {
  return (
    <Menubar className="d-f g-1 p-1 bg-white bc-silver-2 br-lg bw-1">
      <Menu.Root>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          File
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={8}>
            <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs">
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                New
              </Menu.Item>
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Import
              </Menu.Item>
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Export
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Edit
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={8}>
            <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs">
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Cut
              </Menu.Item>
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Copy
              </Menu.Item>
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Paste
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          View
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={8}>
            <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs">
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Board
              </Menu.Item>
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                List
              </Menu.Item>
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Zoom
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          className={(state) =>
            `h-8 br-lg px-3 fs-sm fw-500 c-slate-10 us-none c-p bw-0 bg-transparent ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
        >
          Shortcuts
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={8}>
            <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 br-xl bw-1 bs-o-xs">
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Keyboard shortcuts
              </Menu.Item>
              <Menu.Item
                className={(state) =>
                  `d-f ai-c jc-sb g-4 px-3 py-2 fs-sm us-none c-p br-lg mx-1 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                }
              >
                Cheat sheet
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </Menubar>
  );
}
