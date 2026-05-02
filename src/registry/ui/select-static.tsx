"use client";

import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { CaretsExpandVertical, Check } from "@gravity-ui/icons";

export default function SelectStatic() {
  return (
    <Field.Root className="d-f fd-c g-2">
      <label
        htmlFor="select-status-static"
        className="c-slate-10 fs-sm fw-500 us-none"
      >
        Status
      </label>
      <Select.Root defaultValue={null}>
        <Select.Trigger
          id="select-status-static"
          className={(state) =>
            `d-f ai-c jc-sb h-10 w-64 bw-1 bc-silver-3 br-lg bg-white px-3 c-slate-10 us-none c-p fv:oo--1 fv:oc-indigo-5 ${
              state.open ? "bg-silver-1/50" : "bg-transparent"
            }`
          }
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
        <Select.Portal>
          <Select.Positioner sideOffset={6} alignItemWithTrigger={false} className="zi-10 p-0 ow-0 us-none">
            <Select.Popup className="py-1 w-64 bg-white bc-silver-2 bw-1 br-xl bs-o-lg">
              <Select.List className="p-r o-a">
                {statuses.map(({ label, value }) => (
                  <Select.Item
                    key={value}
                    value={value}
                    className={(state) =>
                      `d-f ai-c g-2 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
                    }
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
