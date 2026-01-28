import { Menu } from "@base-ui/react/menu";
import { CaretDownIcon } from "@phosphor-icons/react";

export default function ExampleMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger className="d-f ai-c jc-c h-10 g-2 bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-md fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
        Song <CaretDownIcon size={12} className="mr--1" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="ow-0" sideOffset={8}>
          <Menu.Popup className="bw-1 bc-silver-4 br-1 bg-white bsh-md py-1 c-slate menu-popup">
            <Menu.Item className="d-f py-1 pr-8 pl-4 fs-sm ow-0 us-none c-d menu-item">
              Add to Library
            </Menu.Item>

            <Menu.Item className="d-f py-1 pr-8 pl-4 fs-sm ow-0 us-none c-d menu-item">
              Add to Playlist
            </Menu.Item>

            <Menu.Separator className="mx-4 my-2 h-px bg-silver-4" />
            <Menu.Item className="d-f py-1 pr-8 pl-4 fs-sm ow-0 us-none c-d menu-item">
              Play Next
            </Menu.Item>
            <Menu.Item className="d-f py-1 pr-8 pl-4 fs-sm ow-0 us-none c-d menu-item">
              Play Last
            </Menu.Item>
            <Menu.Separator className="mx-4 my-2 h-px bg-silver-4" />
            <Menu.Item className="d-f py-1 pr-8 pl-4 fs-sm ow-0 us-none c-d menu-item">
              Favorite
            </Menu.Item>
            <Menu.Item className="d-f py-1 pr-8 pl-4 fs-sm ow-0 us-none c-d menu-item">
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
          color: #f8f9fa;
        }
        .menu-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: #0a0a0c;
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
