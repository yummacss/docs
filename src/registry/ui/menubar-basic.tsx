"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { CaretRightIcon } from "@phosphor-icons/react";

export default function ExampleMenubar() {
  return (
    <Menubar className="d-f br-1 bw-1 bc-silver-4 bg-silver-1 p-1">
      <Menu.Root>
        <Menu.Trigger className="h-8 br-1 px-3 fs-sm fw-500 c-slate-11 ow-0 us-none menubar-trigger">
          File
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={6}>
            <Menu.Popup className="br-1 bg-white c-slate py-1 bsh-md bw-1 bc-silver-4 menubar-popup">
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                New
              </Menu.Item>
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Open
              </Menu.Item>
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Save
              </Menu.Item>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className="d-f w-full ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                  Export
                  <CaretRightIcon size={12} />
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner className="ow-0">
                    <Menu.Popup className="br-1 bg-white c-slate py-1 bsh-md bw-1 bc-silver-4 menubar-submenu">
                      <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                        PDF
                      </Menu.Item>
                      <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                        PNG
                      </Menu.Item>
                      <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                        SVG
                      </Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator className="mx-4 my-2 h-px bg-silver-4" />
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Print
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger className="h-8 br-1 px-3 fs-sm fw-500 c-slate-11 ow-0 us-none menubar-trigger">
          Edit
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={6}>
            <Menu.Popup className="br-1 bg-white c-slate py-1 bsh-md bw-1 bc-silver-4 menubar-popup">
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Cut
              </Menu.Item>
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Copy
              </Menu.Item>
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Paste
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger className="h-8 br-1 px-3 fs-sm fw-500 c-slate-11 ow-0 us-none menubar-trigger">
          View
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="ow-0" sideOffset={6}>
            <Menu.Popup className="br-1 bg-white c-slate py-1 bsh-md bw-1 bc-silver-4 menubar-popup">
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Zoom In
              </Menu.Item>
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Zoom Out
              </Menu.Item>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className="d-f w-full ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                  Layout
                  <CaretRightIcon size={12} />
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner className="ow-0">
                    <Menu.Popup className="br-1 bg-white c-slate py-1 bsh-md bw-1 bc-silver-4 menubar-submenu">
                      <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                        Single Page
                      </Menu.Item>
                      <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                        Two Pages
                      </Menu.Item>
                      <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                        Continuous
                      </Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator className="mx-4 my-2 h-px bg-silver-4" />
              <Menu.Item className="d-f ai-c jc-sb g-4 px-4 py-1 fs-sm c-d us-none ow-0 menubar-item">
                Full Screen
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className="h-8 br-1 px-3 fs-sm fw-500 c-slate-11 ow-0 us-none menubar-trigger">
          Help
        </Menu.Trigger>
      </Menu.Root>

      <style>{`
        .menubar-trigger[data-popup-open] {
          background-color: #dadcdf;
        }
        .menubar-trigger[data-disabled] {
          opacity: 0.5;
        }
        .menubar-popup,
        .menubar-submenu {
          transform-origin: var(--transform-origin);
          transition: transform 150ms, opacity 150ms;
        }
        .menubar-popup[data-ending-style],
        .menubar-submenu[data-ending-style] {
          opacity: 0;
        }
        .menubar-submenu[data-starting-style],
        .menubar-submenu[data-ending-style] {
          transform: scale(0.9);
        }
        .menubar-item[data-highlighted] {
          position: relative;
          z-index: 0;
          color: #f8f9fa;
        }
        .menubar-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: #0a0a0c;
        }
        .menubar-item[data-popup-open] {
          position: relative;
          z-index: 0;
        }
        .menubar-item[data-popup-open]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: #f0f1f2;
        }
        .menubar-item[data-highlighted][data-popup-open]::before {
          background-color: #0a0a0c;
        }
      `}</style>
    </Menubar>
  );
}
