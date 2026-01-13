import { Menu } from "@base-ui/react/menu";
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react";

export default function MenuBasic() {
  return (
    <Menu.Root>
      <Menu.Trigger className="d-f ai-c g-2 px-4 py-2 br-0 fs-sm fw-500 bg-slate-8 c-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2">
        Song <CaretDownIcon size={14} className="ml-1" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="ol-n" sideOffset={8}>
          <Menu.Popup className="br-0 bg-white py-1 bw-1 bc-silver-4 bs-3 c-slate-8 menu-popup">
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
              Add to Library
            </Menu.Item>

            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger className="d-f ai-c jc-sb g-4 c-d py-2 pr-4 pl-4 fs-sm ol-n us-n h:bg-silver-1 w-full">
                Add to Playlist <CaretRightIcon size={12} />
              </Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner
                  className="ol-n"
                  sideOffset={4}
                  alignOffset={-4}
                >
                  <Menu.Popup className="br-0 bg-white py-1 bw-1 bc-silver-4 bs-3 c-slate-8 menu-popup">
                    <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
                      Get Up!
                    </Menu.Item>
                    <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
                      Inside Out
                    </Menu.Item>
                    <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
                      Night Beats
                    </Menu.Item>
                    <Menu.Separator className="mx-4 my-1 h-px bg-silver-4" />
                    <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
                      New playlist…
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>

            <Menu.Separator className="mx-4 my-1 h-px bg-silver-4" />
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
              Play Next
            </Menu.Item>
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
              Play Last
            </Menu.Item>
            <Menu.Separator className="mx-4 my-1 h-px bg-silver-4" />
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
              Favorite
            </Menu.Item>
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm ol-n us-n h:bg-silver-1">
              Share
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
      <style>{`
        .menu-popup {
          transition: opacity 150ms ease-out, transform 150ms ease-out;
          transform-origin: var(--transform-origin);
        }
        .menu-popup[data-starting-style],
        .menu-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.95);
        }
      `}</style>
    </Menu.Root>
  );
}
