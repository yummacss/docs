"use client";

import { Menu } from "@base-ui/react/menu";
import { ChevronDown } from "@gravity-ui/icons";

export default function MenuStatic() {
  return (
    <Menu.Root>
      <Menu.Trigger className="d-f b-0 ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs us-none c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        Actions <ChevronDown className="w-3 h-3" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner className="ow-0" sideOffset={8}>
          <Menu.Popup className="py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
            <Menu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                  state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                }`
              }
            >
              Edit
            </Menu.Item>
            <Menu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                  state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                }`
              }
            >
              Duplicate
            </Menu.Item>
            <Menu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p br-lg mx-1 fw-500 ${
                  state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                }`
              }
            >
              Archive
            </Menu.Item>

            <Menu.Separator className="my-1 w-full h-px bg-silver-2" />

            <Menu.Item
              className={(state) =>
                `d-f py-2 pr-8 pl-4 fs-sm us-none c-p c-red br-lg mx-1 fw-500 ${
                  state.highlighted ? "bg-red-1/50" : "h:bg-red-1"
                }`
              }
            >
              Delete
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
