import { ContextMenu } from "@base-ui/react/context-menu";
import { CaretRightIcon } from "@phosphor-icons/react";

export default function ExampleContextMenu() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 br-1 bw-1 bc-silver-4 c-slate us-none">
        Right click here
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner className="ow-0">
          <ContextMenu.Popup className="br-1 bg-white c-slate py-1 bs-md bw-1 bc-silver-4 context-menu-popup">
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
              Add to Library
            </ContextMenu.Item>

            <ContextMenu.SubmenuRoot>
              <ContextMenu.SubmenuTrigger className="d-f ai-c jc-sb g-4 py-2 pr-4 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
                Add to Playlist <CaretRightIcon size={10} />
              </ContextMenu.SubmenuTrigger>
              <ContextMenu.Portal>
                <ContextMenu.Positioner
                  className="ow-0"
                  alignOffset={-4}
                  sideOffset={-4}
                >
                  <ContextMenu.Popup className="br-1 bg-white c-slate py-1 bs-md bw-1 bc-silver-4 context-menu-submenu">
                    <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
                      Get Up!
                    </ContextMenu.Item>
                    <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
                      Inside Out
                    </ContextMenu.Item>
                    <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
                      Night Beats
                    </ContextMenu.Item>
                    <ContextMenu.Separator className="mx-4 my-1-5 h-px bg-silver-4" />
                    <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
                      New playlist…
                    </ContextMenu.Item>
                  </ContextMenu.Popup>
                </ContextMenu.Positioner>
              </ContextMenu.Portal>
            </ContextMenu.SubmenuRoot>

            <ContextMenu.Separator className="mx-4 my-1-5 h-px bg-silver-4" />
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
              Play Next
            </ContextMenu.Item>
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
              Play Last
            </ContextMenu.Item>
            <ContextMenu.Separator className="mx-4 my-1-5 h-px bg-silver-4" />
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
              Favorite
            </ContextMenu.Item>
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm us-none c-d ow-0 context-menu-item">
              Share
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>

      <style>{`
        .context-menu-popup {
          transform-origin: var(--transform-origin);
          transition: opacity 150ms;
        }
        .context-menu-popup[data-ending-style] {
          opacity: 0;
        }
        .context-menu-submenu {
          transform-origin: var(--transform-origin);
          transition: transform 150ms, opacity 150ms;
        }
        .context-menu-submenu[data-starting-style],
        .context-menu-submenu[data-ending-style] {
          opacity: 0;
          transform: scale(0.9);
        }
        .context-menu-item[data-highlighted] {
          position: relative;
          z-index: 0;
          color: var(--silver-1);
        }
        .context-menu-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: var(--slate);
        }
        .context-menu-item[data-popup-open] {
          position: relative;
          z-index: 0;
        }
        .context-menu-item[data-popup-open]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: var(--silver-2);
        }
        .context-menu-item[data-highlighted][data-popup-open]::before {
          background-color: var(--slate);
        }
      `}</style>
    </ContextMenu.Root>
  );
}
