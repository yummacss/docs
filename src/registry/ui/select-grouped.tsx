"use client";

import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function SelectGrouped() {
  const [open, setOpen] = useState(false);

  return (
    <Field.Root className="d-f fd-c g-2">
      <label
        htmlFor="select-grouped"
        className="c-slate-10 fs-sm fw-500 us-none"
      >
        Task Category
      </label>
      <Select.Root defaultValue={null} open={open} onOpenChange={setOpen}>
        <Select.Trigger
          id="select-grouped"
          className={`d-f ai-c jc-sb h-10 w-64 bw-1 bc-silver-3 br-lg bg-white px-3 c-slate-10 us-none c-p bs-o-xs fv:oo--1 fv:oc-indigo-5 ${
            open ? "bg-silver-1/50" : "bg-transparent"
          }`}
        >
          <Select.Value>
            {(value) =>
              value
                ? categories
                    .flatMap((c) => c.items)
                    .find((i) => i.value === value)?.label
                : "Select category..."
            }
          </Select.Value>
          <Select.Icon className="d-f c-slate-8">
            <ChevronsUpDown className="w-4 h-4" />
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
                  className="py-1 w-64 bg-white bc-silver-2 bw-1 br-lg bs-o-xs"
                >
                  <Select.List className="p-r o-auto">
                    {categories.map((group, groupIndex) => (
                      <Select.Group key={group.groupLabel}>
                        {group.items.map(({ label, value }) => (
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
                        {groupIndex < categories.length - 1 && (
                          <div className="w-100% h-px my-1 bg-silver-2" />
                        )}
                      </Select.Group>
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

const categories = [
  {
    groupLabel: "Development",
    items: [
      { label: "Bug", value: "bug" },
      { label: "Feature", value: "feature" },
      { label: "Enhancement", value: "enhancement" },
    ],
  },
  {
    groupLabel: "Project",
    items: [
      { label: "Documentation", value: "documentation" },
      { label: "Design", value: "design" },
      { label: "Research", value: "research" },
    ],
  },
];
