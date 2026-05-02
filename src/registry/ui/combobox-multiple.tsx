"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Check, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function ItemIcon({ selected }: { selected: boolean }) {
  return selected ? (
    <Check className="fs-0 w-4 h-4 c-indigo-6" />
  ) : (
    <Check className="fs-0 w-4 h-4 c-transparent" />
  );
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
      <div className="d-f fd-c g-2 c-slate-10 fs-sm">
        <label htmlFor="role-input" className="fw-500">
          Assign role
        </label>
        <div className="d-f fw-w ai-c g-1 min-h-10 w-72">
          <Combobox.Input
            id="role-input"
            placeholder="Assign role..."
            className="f-1 min-w-16 px-3 py-2 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-6"
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Combobox.Portal keepMounted>
            <Combobox.Positioner className="ow-0" sideOffset={12}>
              <Combobox.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="o-h w-72 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
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
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}

const roles = [
  "Admin",
  "Moderator",
  "Member",
  "VIP",
  "Streamer",
  "Partner",
  "Booster",
  "Newbie",
];
