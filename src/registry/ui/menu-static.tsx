import { Menu } from "@base-ui/react/menu";
import { NavArrowDown } from "iconoir-react";

export default function MenuStatic() {
  return (
    <Menu.Root>
      <Menu.Trigger className="d-f ai-c g-2 px-3 py-2 h-fc bg-white bc-silver-2 c-slate-10 br-lg bw-1 fw-500 bs-o-xs us-none c-p h:bg-silver-1/50 fv:oo--1 fv:oc-indigo-5">
        Actions <NavArrowDown className="w-3 h-3" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner className="ow-0" sideOffset={8}>
          <Menu.Popup className="py-1 w-52 bg-white bc-silver-2 c-slate-10 bw-1 br-xxl bs-o-xs">
            <Menu.Item
              className={(state) =>
                `d-f py-2 pl-2 pr-3 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                  state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                }`
              }
            >
              Edit
            </Menu.Item>
            <Menu.Item
              className={(state) =>
                `d-f py-2 pl-2 pr-3 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                  state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                }`
              }
            >
              Duplicate
            </Menu.Item>
            <Menu.Item
              className={(state) =>
                `d-f py-2 pl-2 pr-3 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                  state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                }`
              }
            >
              Bookmark
            </Menu.Item>
            <Menu.Item
              className={(state) =>
                `d-f py-2 pl-2 pr-3 fs-sm us-none c-p br-xl mx-1 fw-500 ${
                  state.highlighted ? "bg-silver-2/50" : "bg-transparent"
                }`
              }
            >
              Pin to top
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
