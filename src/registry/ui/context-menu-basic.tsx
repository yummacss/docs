import { ContextMenu } from "@base-ui/react/context-menu";

export default function ExampleContextMenu() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="d-f ai-c jc-c h-48 w-60 bw-1 bc-silver-4 br-1 c-slate-12 us-none">
        Right click here
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner className="ow-0">
          <ContextMenu.Popup className="bw-1 bc-silver-4 br-1 bg-white bsh-md py-1 c-slate-12 context-menu-popup">
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm ow-0 us-none c-d context-menu-item">
              Add to Library
            </ContextMenu.Item>

            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm ow-0 us-none c-d context-menu-item">
              Add to Playlist
            </ContextMenu.Item>

            <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-4" />
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm ow-0 us-none c-d context-menu-item">
              Play Next
            </ContextMenu.Item>
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm ow-0 us-none c-d context-menu-item">
              Play Last
            </ContextMenu.Item>
            <ContextMenu.Separator className="mx-4 my-1 h-px bg-silver-4" />
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm ow-0 us-none c-d context-menu-item">
              Favorite
            </ContextMenu.Item>
            <ContextMenu.Item className="d-f py-2 pr-8 pl-4 fs-sm ow-0 us-none c-d context-menu-item">
              Share
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>

      <style>{`
        .context-menu-popup {
          transform-origin: var(--transform-origin);
          transition: transform 150ms ease-out, opacity 150ms ease-out;
        }
        .context-menu-popup[data-starting-style],
        .context-menu-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.95);
        }
        .context-menu-item[data-highlighted] {
          position: relative;
          z-index: 0;
          color: #f5f5f6;
        }
        .context-menu-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0.125rem;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: #0a0a0c;
        }
        .context-menu-item[data-popup-open] {
          position: relative;
          z-index: 0;
        }
        .context-menu-item[data-popup-open]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0.125rem;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: #f0f1f2;
        }
        .context-menu-item[data-highlighted][data-popup-open]::before {
          background-color: #0a0a0c;
        }
      `}</style>
    </ContextMenu.Root>
  );
}
