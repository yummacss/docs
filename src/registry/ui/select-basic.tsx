"use client";

import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { CaretUpDownIcon, CheckIcon } from "@phosphor-icons/react";

export default function ExampleSelect() {
  return (
    <Field.Root className="d-f fd-c g-1">
      <label
        htmlFor="select-apples"
        className="c-d fs-sm fw-500 c-slate-12 select-none"
      >
        Apple
      </label>
      <Select.Root defaultValue={null}>
        <Select.Trigger
          id="select-apples"
          className="d-f ai-c jc-sb h-10 min-w-40 g-3 bw-1 bc-silver-4 br-1 bg-white px-3 c-slate-12 us-none h:bg-silver-1 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 select-trigger"
        >
          <Select.Value>
            {(value) =>
              value
                ? apples.find((f) => f.value === value)?.label
                : "Select apple..."
            }
          </Select.Value>
          <Select.Icon className="d-f">
            <CaretUpDownIcon size={16} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            alignItemWithTrigger
            className="ow-0 us-none zi-10"
          >
            <Select.Popup className="bw-1 bc-silver-4 br-1 bg-white bsh-md c-slate-12 select-popup">
              <Select.List className="p-r py-1 o-a">
                {apples.map(({ label, value }) => (
                  <Select.Item
                    key={label}
                    value={value}
                    className="d-g ai-c g-2 py-1 px-3 ow-0 us-none c-d select-item"
                  >
                    <Select.ItemIndicator className="gcs-1 d-f ai-c">
                      <CheckIcon size={16} />
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
            background-color: #f5f5f6;
          }
          .select-popup {
            min-width: var(--anchor-width);
            transform-origin: var(--transform-origin);
            transition: transform 150ms, opacity 150ms;
          }
          .select-popup[data-side='none'] {
            transition: none;
            transform: none;
            opacity: 1;
            min-width: calc(var(--anchor-width) + 1rem);
          }
          .select-popup[data-starting-style],
          .select-popup[data-ending-style] {
            opacity: 0;
            transform: scale(0.9);
          }
          .select-popup[data-side='none'][data-starting-style],
          .select-popup[data-side='none'][data-ending-style] {
            opacity: 1;
            transform: none;
          }
          .select-item {
            grid-template-columns: 1.25rem 1fr;
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          .select-item[data-highlighted] {
            position: relative;
            z-index: 0;
            color: #f5f5f6;
          }
          .select-item[data-highlighted]::before {
            content: '';
            position: absolute;
            z-index: -1;
            inset-block: 0;
            inset-inline: 0.25rem;
            border-radius: 0.25rem;
            background-color: #0a0a0c;
          }
        `}</style>
      </Select.Root>
    </Field.Root>
  );
}

const apples = [
  { label: "Gala", value: "gala" },
  { label: "Fuji", value: "fuji" },
  { label: "Honeycrisp", value: "honeycrisp" },
  { label: "Granny Smith", value: "granny-smith" },
  { label: "Pink Lady", value: "pink-lady" },
];
