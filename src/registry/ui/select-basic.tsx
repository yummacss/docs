"use client";

import { Select } from "@base-ui/react/select";
import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react";

export default function ExampleSelect() {
  return (
    <Select.Root defaultValue={null}>
      <Select.Trigger className="d-f ai-c jc-sb h-10 min-w-36 g-3 bw-1 bc-silver-4 br-1 bg-white px-3 c-slate us-none h:bg-silver-1 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 select-trigger">
        <Select.Value>
          {(value) =>
            value
              ? fonts.find((f) => f.value === value)?.label
              : "Select font..."
          }
        </Select.Value>
        <Select.Icon className="d-f">
          <CaretUpDownIcon size={10} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={8} className="ow-0 us-none zi-10">
          <Select.Popup className="bw-1 bc-silver-4 br-1 bg-white bs-md c-slate select-popup">
            <Select.List className="p-r py-1 o-a">
              {fonts.map(({ label, value }) => (
                <Select.Item
                  key={label}
                  value={value}
                  className="d-g ai-c g-2 py-2 px-3 ow-0 us-none c-d select-item"
                >
                  <Select.ItemIndicator className="gcs-1">
                    <CheckIcon size={12} />
                  </Select.ItemIndicator>
                  <Select.ItemText className="gcs-2">{label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>

      <style>{`
        .select-trigger[data-popup-open] {
          background-color: var(--silver-1);
        }
        .select-popup {
          min-width: var(--anchor-width);
          transform-origin: var(--transform-origin);
          transition: transform 150ms, opacity 150ms;
        }
        .select-popup[data-starting-style],
        .select-popup[data-ending-style] {
          opacity: 0;
          transform: scale(0.9);
        }
        .select-item {
          grid-template-columns: 0.75rem 1fr;
          font-size: 0.875rem;
          line-height: 1rem;
        }
        .select-item[data-highlighted] {
          position: relative;
          z-index: 0;
          color: var(--silver-1);
        }
        .select-item[data-highlighted]::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset-block: 0;
          inset-inline: 0.25rem;
          border-radius: 0.25rem;
          background-color: var(--slate);
        }
      `}</style>
    </Select.Root>
  );
}

const fonts = [
  { label: "Sans-serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "mono" },
  { label: "Cursive", value: "cursive" },
];
