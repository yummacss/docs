"use client";

import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { CaretsExpandVertical, Check } from "@gravity-ui/icons";
import * as React from "react";

const itemClass = (state: { highlighted: boolean }) =>
  `d-f ai-c g-2 py-2 px-3 fs-sm us-none c-p br-sm mx-1 c-slate-10 ${
    state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
  }`;

export default function SelectStatic() {
  const [open, setOpen] = React.useState(false);

  return (
    <Field.Root className="d-f fd-c g-2">
      <label
        htmlFor="select-status"
        className="c-slate-10 fs-sm fw-600 us-none"
      >
        Status
      </label>
      <Select.Root defaultValue={null} open={open} onOpenChange={setOpen}>
        <Select.Trigger
          id="select-status"
          className={`d-f ai-c jc-sb h-10 min-w-40 g-3 bw-1 bc-silver-3 br-md bg-white px-3 c-slate-10 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
            open ? "bg-silver-1" : "h:bg-silver-1"
          }`}
        >
          <Select.Value>
            {(value) =>
              value
                ? statuses.find((s) => s.value === value)?.label
                : "Select status..."
            }
          </Select.Value>
          <Select.Icon className="d-f c-slate-8">
            <CaretsExpandVertical className="w-4 h-4" />
          </Select.Icon>
        </Select.Trigger>
        {open && (
          <Select.Portal>
            <Select.Positioner sideOffset={6} className="zi-10 ow-0 us-none">
              <Select.Popup
                className="py-1 bg-white bc-silver-2 bw-1 br-md bs-o-lg"
                style={{ minWidth: "var(--anchor-width)" }}
              >
                <Select.List className="p-r o-a">
                  {statuses.map(({ label, value }) => (
                    <Select.Item
                      key={value}
                      value={value}
                      className={itemClass}
                    >
                      <Select.ItemIndicator className="d-f ai-c">
                        <Check className="w-4 h-4" />
                      </Select.ItemIndicator>
                      <Select.ItemText>{label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        )}
      </Select.Root>
    </Field.Root>
  );
}

const statuses = [
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "in-review" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
];
