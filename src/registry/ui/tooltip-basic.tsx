import { Tooltip } from "@base-ui/react/tooltip";
import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";

export default function ExampleTooltip() {
  return (
    <Tooltip.Provider>
      <div className="d-f bw-1 bc-silver-4 br-1 bg-silver-1 p-1">
        <Tooltip.Root>
          <Tooltip.Trigger className="d-f d-8 ai-c jc-c br-1 b-0 bg-transparent c-slate us-none h:bg-silver-2 tooltip-trigger">
            <TextBIcon size={16} aria-label="Bold" />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={10}>
              <Tooltip.Popup className="d-f fd-c px-2 py-1 br-1 fs-sm bg-white tooltip-popup">
                Bold
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger className="d-f d-8 ai-c jc-c br-1 b-0 bg-transparent c-slate us-none h:bg-silver-2 tooltip-trigger">
            <TextItalicIcon size={16} aria-label="Italic" />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={10}>
              <Tooltip.Popup className="d-f fd-c px-2 py-1 br-1 fs-sm bg-white tooltip-popup">
                Italic
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger className="d-f d-8 ai-c jc-c br-1 b-0 bg-transparent c-slate us-none h:bg-silver-2 tooltip-trigger">
            <TextUnderlineIcon size={16} aria-label="Underline" />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={10}>
              <Tooltip.Popup className="d-f fd-c px-2 py-1 br-1 fs-sm bg-white tooltip-popup">
                Underline
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>

      <style>{`
        .tooltip-trigger:focus-visible {
          outline: 2px solid var(--blue-8);
          outline-offset: -1px;
        }
        .tooltip-trigger[data-popup-open] {
          background-color: var(--silver-2);
        }
        .tooltip-popup {
          outline: 1px solid var(--silver-4);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform-origin: var(--transform-origin);
          transition: transform 150ms, opacity 150ms;
        }
        .tooltip-popup[data-starting-style],
        .tooltip-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.9);
        }
        .tooltip-popup[data-instant] {
          transition: none;
        }
      `}</style>
    </Tooltip.Provider>
  );
}
