import { Menu } from "@base-ui/react/menu";
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react";

export default function ExampleMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger className="d-f h-10 ai-c jc-c g-2 px-4 bw-1 bc-silver-4 br-1 bg-silver-1 fs-md fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
        Song <CaretDownIcon size={10} className="mr--1" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="ow-0" sideOffset={8}>
          <Menu.Popup className="br-1 bg-white py-1 bw-1 bc-silver-4 bs-md c-slate menu-popup">
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
              Add to Library
            </Menu.Item>

            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger className="d-f ai-c jc-sb g-4 c-d py-2 pr-4 pl-4 fs-sm us-none ow-0 w-full menu-item">
                Add to Playlist <CaretRightIcon size={10} />
              </Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner
                  className="ow-0"
                  sideOffset={-4}
                  alignOffset={-4}
                >
                  <Menu.Popup className="br-1 bg-white py-1 bw-1 bc-silver-4 bs-md c-slate menu-submenu">
                    <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
                      Get Up!
                    </Menu.Item>
                    <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
                      Inside Out
                    </Menu.Item>
                    <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
                      Night Beats
                    </Menu.Item>
                    <Menu.Separator className="mx-4 my-2 h-px bg-silver-4" />
                    <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
                      New playlist…
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>

            <Menu.Separator className="mx-4 my-2 h-px bg-silver-4" />
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
              Play Next
            </Menu.Item>
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
              Play Last
            </Menu.Item>
            <Menu.Separator className="mx-4 my-2 h-px bg-silver-4" />
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
              Favorite
            </Menu.Item>
            <Menu.Item className="d-f c-d py-2 pr-8 pl-4 fs-sm us-none ow-0 menu-item">
              Share
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
      <style>{`
        .menu-popup {
          transform-origin: var(--transform-origin);
          transition: transform 150ms, opacity 150ms;
        }
        .menu-popup[data-starting-style],
        .menu-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.9);
        }
        .menu-submenu {
          transform-origin: var(--transform-origin);
          transition: transform 150ms, opacity 150ms;
        }
        .menu-submenu[data-starting-style],
        .menu-submenu[data-ending-style] {
          opacity: 0;
          transform: scale(0.9);
        }
        .menu-item[data-highlighted] {
          position: relative;
          z-index: 0;
          color: var(--silver-1);
        }
        .menu-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: var(--slate);
        }
        .menu-item[data-popup-open] {
          position: relative;
          z-index: 0;
        }
        .menu-item[data-popup-open]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: var(--silver-2);
        }
        .menu-item[data-highlighted][data-popup-open]::before {
          background-color: var(--slate);
        }
      `}</style>
    </Menu.Root>
  );
}
