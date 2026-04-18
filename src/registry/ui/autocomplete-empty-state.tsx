"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function AutocompleteEmptyState() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root items={[]} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="empty-state-input" className="c-slate-10 fs-sm fw-500">
          Mention user
        </label>
        <Autocomplete.Input
          id="empty-state-input"
          placeholder="e.g. Sarah"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo--1 fv:oc-indigo-6"
        />
      </div>

      <AnimatePresence>
        {open && (
          <Autocomplete.Portal keepMounted>
            <Autocomplete.Positioner className="ow-0" sideOffset={4}>
              <Autocomplete.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <Autocomplete.List className="py-3 ow-0">
                  <div className="d-f fd-c ai-c g-1 px-4">
                    <span className="c-slate-10 fs-md fw-500">
                      No results found
                    </span>
                    <span className="c-slate-6 fs-sm">
                      Try searching for someone else
                    </span>
                  </div>
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}
