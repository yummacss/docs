"use client";

import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { ArrowSeparateVertical, Check } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function SelectBase() {
  const [open, setOpen] = useState(false);

  return (
    <Field.Root className="d-f fd-c g-2">
      <label
        htmlFor="select-status"
        className="c-slate-10 fs-sm fw-500 us-none"
      >
        Task Status
      </label>
      <Select.Root defaultValue={null} open={open} onOpenChange={setOpen}>
        <Select.Trigger
          id="select-status"
          className={`d-f ai-c jc-sb h-10 w-64 bw-1 bc-silver-3 br-md bg-white px-3 c-slate-10 us-none c-p bs-o-xs fv:oo--1 fv:oc-indigo-5 ${
            open ? "bg-silver-1/50" : "bg-transparent"
          }`}
        >
          <Select.Value>
            {(value) => (
              <span className="min-w-0 o-h to-e ws-nw">
                {value
                  ? statuses.find((s) => s.value === value)?.label
                  : "Select status..."}
              </span>
            )}
          </Select.Value>
          <Select.Icon className="d-f c-slate-8">
            <ArrowSeparateVertical className="w-4 h-4" />
          </Select.Icon>
        </Select.Trigger>
        <AnimatePresence>
          {open && (
            <Select.Portal>
              <Select.Positioner
                sideOffset={8}
                alignItemWithTrigger={false}
                className="zi-10 p-0 ow-0 us-none"
              >
                <Select.Popup
                  render={
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  }
                  className="py-1 w-64 bg-white bc-silver-2 bw-1 br-md bs-o-xs"
                >
                  <Select.List className="p-r o-auto">
                    {statuses.map(({ label, value }) => (
                      <Select.Item
                        key={value}
                        value={value}
                        className={(state) =>
                          `d-f ai-c g-2 py-2 px-3 fs-sm us-none c-p br-md mx-1 c-slate-10 fw-500 ${state.highlighted ? "bg-silver-1/50" : "bg-transparent"}`
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
          )}
        </AnimatePresence>
      </Select.Root>
    </Field.Root>
  );
}

const statuses = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
  { label: "Blocked", value: "blocked" },
];
