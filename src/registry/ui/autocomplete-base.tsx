"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { COLOR_FAMILIES } from "@/utils/colors";

export default function ExampleAutocomplete() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root
      items={COLOR_FAMILIES}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="d-f fd-c g-2">
        <label htmlFor="autocomplete-input" className="c-slate-10 fs-sm fw-600">
          Color
        </label>
        <Autocomplete.Input
          id="autocomplete-input"
          placeholder="e.g. Indigo"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-2 fs-sm fv:os-s fv:ow-2 fv:oo--1 fv:oc-indigo-6"
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
                className="o-h w-64 py-1 bg-white bc-silver-2 c-slate-10 bw-1 br-2 bs-o-lg"
              >
                <Autocomplete.Empty className="py-4 px-4 c-slate-6 fs-sm">
                  No colors found.
                </Autocomplete.Empty>
                <Autocomplete.List className="o-y-auto max-h-72 ow-0">
                  {(color: { name: string; color: string }) => (
                    <Autocomplete.Item
                      key={color.name}
                      value={color}
                      render={(props, state) => (
                        <div
                          {...props}
                          className={`d-f ai-c g-3 py-2 px-3 fs-sm us-none c-d c-p br-1 mx-1 c-slate-10 ${
                            state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                          }`}
                        >
                          <div
                            className="fs-0 w-4 h-4 br-pill"
                            style={{ backgroundColor: color.color }}
                          />
                          {color.name}
                        </div>
                      )}
                    />
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}
