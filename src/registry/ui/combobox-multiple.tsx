"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Check, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function ItemIcon({ selected }: { selected: boolean }) {
  if (!selected) return null;
  return <Check className="fs-0 w-4 h-4 c-indigo-6" />;
}

function ChipItem({ chip }: { chip: string }) {
  return (
    <Combobox.Chip
      key={chip}
      className="d-f ai-c g-1 px-2 py-0 h-6 bg-indigo-1 bc-indigo-2 c-indigo-7 bw-1 br-pill fs-xs fw-500"
    >
      {chip}
      <Combobox.ChipRemove
        className="d-f b-0 ai-c jc-c p-0 bg-transparent c-indigo-5 c-p h:c-indigo-8"
        aria-label={`Remove ${chip}`}
      >
        <Xmark className="w-3 h-3" />
      </Combobox.ChipRemove>
    </Combobox.Chip>
  );
}

export default function ComboboxMultiple() {
  const [open, setOpen] = useState(false);

  return (
    <Combobox.Root multiple items={roles} open={open} onOpenChange={setOpen}>
      <div className="d-f p-r fd-c g-2 c-slate-10 fs-sm">
        <label htmlFor="role-input" className="fw-500">
          Set priority
        </label>
        <div className="p-r">
          <Combobox.Chips className="d-f fw-w ai-c g-0 px-3 py-1">
            {((chip: string) => <ChipItem chip={chip} />) as any}
          </Combobox.Chips>
          <Combobox.Input
            id="role-input"
            placeholder="Add priority..."
            className="h-10 w-64 pl-4 pr-10 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-10 c-slate-6">
            <Combobox.Clear
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10 fv:oo--1 fv:oc-indigo-5"
              aria-label="Clear selection"
            >
              <Xmark className="w-4 h-4" />
            </Combobox.Clear>
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
              <Combobox.Popup
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <Combobox.List className="oy-auto py-1 max-h-56 ow-0">
                  {(role: string) => (
                    <Combobox.Item
                      key={role}
                      value={role}
                      render={(props, state) => (
                        <div
                          {...props}
                          className={`d-f ai-c g-2 py-2 px-3 fs-sm fw-500 c-slate-8 us-none c-p br-lg mx-1 ${
                            state.highlighted
                              ? "bg-silver-1/50"
                              : "bg-transparent"
                          }`}
                        >
                          <ItemIcon selected={state.selected} />
                          <span className="fg-1">{role}</span>
                        </div>
                      )}
                    />
                  )}
                </Combobox.List>
                <Combobox.Empty className="c-slate-6 fs-sm">
                  <div className="py-4 px-4">No roles found.</div>
                </Combobox.Empty>
              </Combobox.Popup>
              </motion.div>
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}

const roles = [
  "High Priority",
  "Medium Priority",
  "Low Priority",
  "Blocker",
  "On Hold",
  "In Review",
  "Done",
  "Backlog",
];
