"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Check, ChevronsExpandVertical, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ComboboxEmpty() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredPriorities = query.trim()
    ? priorities.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : priorities;

  return (
    <Combobox.Root
      items={priorities}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="d-f p-r fd-c g-2 c-slate-10 fs-sm">
        <label htmlFor="empty-input" className="fw-500">
          Set priority
        </label>
        <div className="p-r">
          <Combobox.Input
            id="empty-input"
            placeholder="Select priority..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length > 0) setOpen(true);
            }}
            className="h-10 w-64 pl-4 pr-16 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-10 c-slate-6">
            <Combobox.Clear
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10 fv:oo--1 fv:oc-indigo-5"
              aria-label="Clear selection"
              onClick={() => setQuery("")}
            >
              <Xmark className="w-4 h-4" />
            </Combobox.Clear>
            <Combobox.Trigger
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10 fv:oo--1 fv:oc-indigo-5"
              aria-label="Open popup"
            >
              <ChevronsExpandVertical className="w-4 h-4" />
            </Combobox.Trigger>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Combobox.Portal keepMounted>
            <Combobox.Positioner className="ow-0" sideOffset={8}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <Combobox.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                  {filteredPriorities.length > 0 ? (
                    <Combobox.List className="oy-auto py-1 max-h-56 ow-0">
                      {(priority: Priority) => (
                        <Combobox.Item
                          key={priority.label}
                          value={priority.label}
                          className={(state) =>
                            `d-f ai-c g-2 py-2 px-3 fs-sm fw-500 c-slate-8 us-none c-p br-lg mx-1 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`
                          }
                        >
                          <span
                            className={`d-if ai-c jc-c w-5 h-5 br-sm fs-xs c-white ${priority.color}`}
                          >
                            {priority.label[0]}
                          </span>
                          <span className="fg-1">{priority.label}</span>
                          <Combobox.ItemIndicator className="d-f ml-auto c-indigo">
                            <Check className="w-3 h-3" />
                          </Combobox.ItemIndicator>
                        </Combobox.Item>
                      )}
                    </Combobox.List>
                  ) : (
                    <div className="py-4 px-4">
                      <span className="c-slate-6 fs-sm">No options found.</span>
                    </div>
                  )}
                </Combobox.Popup>
              </motion.div>
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}

interface Priority {
  label: string;
  color: string;
}

const priorities: Priority[] = [
  { label: "Critical", color: "bg-red-5" },
  { label: "High", color: "bg-orange-5" },
  { label: "Medium", color: "bg-yellow-5" },
  { label: "Low", color: "bg-sky-5" },
  { label: "Backlog", color: "bg-slate-5" },
];