"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

interface ColorFamily {
  name: string;
  color: string;
}

const COLOR_FAMILIES: ColorFamily[] = [
  { name: "Red", color: "#e63946" },
  { name: "Orange", color: "#ff6b35" },
  { name: "Yellow", color: "#ffb81c" },
  { name: "Lime", color: "#84cc16" },
  { name: "Mint", color: "#10b981" },
  { name: "Green", color: "#06d6a0" },
  { name: "Cyan", color: "#06b6d4" },
  { name: "Sky", color: "#38bdf8" },
  { name: "Blue", color: "#2563eb" },
  { name: "Indigo", color: "#6366f1" },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Lavender", color: "#a78bfa" },
  { name: "Magenta", color: "#d946ef" },
  { name: "Pink", color: "#ec4899" },
  { name: "Coral", color: "#ff6f91" },
  { name: "Zinc", color: "#52525b" },
  { name: "Gray", color: "#6b7280" },
  { name: "Slate", color: "#64748b" },
  { name: "Silver", color: "#9ca3af" },
];

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
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-md fs-md fv:os-s fv:ow-2 fv:oo--1 fv:oc-indigo-6"
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
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-lg"
              >
                <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                  {(color: ColorFamily) => (
                    <Autocomplete.Item
                      key={color.name}
                      value={color.name}
                      render={(props, state) => (
                        <div
                          {...props}
                          className={`d-f ai-c g-3 py-2 px-3 fs-sm us-none c-d c-p br-sm mx-1 c-slate-10 ${
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
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="py-4 px-4">No colors found.</div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

