"use client";

import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { useId } from "react";

export default function ExampleCombobox() {
  const id = useId();

  return (
    <Combobox.Root items={fruits}>
      <div className="d-f fd-c g-1 fs-sm fw-500 c-slate-12 p-r">
        <label htmlFor={id}>Choose a fruit</label>
        <div className="p-r combobox-input-wrapper">
          <Combobox.Input
            placeholder="e.g. Apple"
            id={id}
            className="h-10 w-64 bw-1 bc-silver-4 br-1 bg-white pl-4 fs-md c-slate-12 f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
          />
          <div className="p-a d-f ai-c jc-c r-2 b-0 h-10 c-silver-9">
            <Combobox.Clear
              className="d-f ai-c jc-c d-6 h-10 br-1 bg-transparent p-0 combobox-clear"
              aria-label="Clear selection"
            >
              <XIcon size={16} />
            </Combobox.Clear>
            <Combobox.Trigger
              className="d-f ai-c jc-c d-6 h-10 br-1 bg-transparent p-0"
              aria-label="Open popup"
            >
              <CaretDownIcon size={16} />
            </Combobox.Trigger>
          </div>
        </div>
      </div>

      <Combobox.Portal>
        <Combobox.Positioner className="ow-0" sideOffset={4}>
          <Combobox.Popup className="bw-1 bc-silver-4 br-1 bg-white bs-lg c-slate-12 o-h combobox-popup">
            <Combobox.Empty className="p-4 fs-sm c-silver-9 combobox-empty">
              No fruits found.
            </Combobox.Empty>
            <Combobox.List className="o-y-auto ow-0 py-2 combobox-list">
              {(item: string) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className="d-g ai-c g-2 py-2 pr-8 pl-4 fs-md ow-0 us-none c-d combobox-item"
                >
                  <Combobox.ItemIndicator className="combobox-indicator">
                    <CheckIcon size={12} weight="bold" />
                  </Combobox.ItemIndicator>
                  <div className="combobox-item-text">{item}</div>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>

      <style>{`
        .combobox-input-wrapper:has(.combobox-clear) input {
          padding-right: calc(0.5rem + 1.5rem * 2);
        }
        .combobox-popup {
          width: var(--anchor-width);
          max-height: 23rem;
          max-width: var(--available-width);
          transform-origin: var(--transform-origin);
          transition: opacity 100ms, transform 100ms;
        }
        .combobox-popup[data-starting-style],
        .combobox-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.95);
        }
        .combobox-empty:empty {
          display: none;
        }
        .combobox-list {
          max-height: min(23rem, var(--available-height));
          overscroll-behavior: contain;
        }
        .combobox-list[data-empty] {
          padding: 0;
        }
        .combobox-item {
          grid-template-columns: 0.75rem 1fr;
        }
        .combobox-item[data-highlighted] {
          position: relative;
          z-index: 0;
          color: #f8f9fa;
        }
        .combobox-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.5rem;
          border-radius: 0.25rem;
          background-color: #0a0a0c;
        }
        .combobox-indicator {
          grid-column-start: 1;
        }
        .combobox-item-text {
          grid-column-start: 2;
        }
      `}</style>
    </Combobox.Root>
  );
}

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Grape",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Cherry",
  "Peach",
  "Pear",
  "Kiwi",
  "Watermelon",
];
