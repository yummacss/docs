"use client";

import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleCombobox() {
  const [open, setOpen] = React.useState(false);

  return (
    <Combobox.Root items={countries} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2 fs-sm c-slate-10 p-r">
        <label className="fw-600">Select country</label>
        <div className="p-r">
          <Combobox.Input
            placeholder="e.g. United States"
            className="h-10 w-64 bw-1 bc-silver-3 br-2 bg-white pl-4 pr-16 fs-sm c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
          />
          <div className="p-a d-f ai-c jc-c r-2 b-0 h-10 c-slate-6">
            <Combobox.Clear
              className="d-f ai-c jc-c w-6 h-6 h-10 br-1 bg-transparent p-0 b-0 c-slate-6 h:c-slate-10 c-p"
              aria-label="Clear selection"
            >
              <XIcon size={16} />
            </Combobox.Clear>
            <Combobox.Trigger
              className="d-f ai-c jc-c w-6 h-6 h-10 br-1 bg-transparent p-0 b-0 c-slate-6 h:c-slate-10 c-p"
              aria-label="Open popup"
            >
              <CaretDownIcon size={16} />
            </Combobox.Trigger>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Combobox.Portal keepMounted>
            <Combobox.Positioner className="ow-0" sideOffset={8}>
              <Combobox.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                }
                className="w-64 bw-1 bc-silver-2 br-2 bg-white bs-o-lg c-slate-10 o-h"
              >
                <Combobox.Empty className="py-4 px-4 fs-sm c-slate-6">
                  No countries found.
                </Combobox.Empty>
                <Combobox.List
                  className="o-y-auto ow-0"
                  style={{ maxHeight: "18rem" }}
                >
                  {(country: Country) => (
                    <Combobox.Item
                      key={country.code}
                      value={country}
                      className={(state) =>
                        `d-f ai-c g-2 py-2 px-4 fs-sm us-none c-d c-p ${
                          state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                        }`
                      }
                    >
                      <Combobox.ItemIndicator className="d-f c-indigo">
                        <CheckIcon size={12} weight="bold" />
                      </Combobox.ItemIndicator>
                      <span className="fg-1">{country.name}</span>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}

interface Country {
  code: string;
  name: string;
}

const countries: Country[] = [
  { code: "us", name: "United States" },
  { code: "ca", name: "Canada" },
  { code: "gb", name: "United Kingdom" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "jp", name: "Japan" },
  { code: "au", name: "Australia" },
  { code: "br", name: "Brazil" },
  { code: "in", name: "India" },
  { code: "mx", name: "Mexico" },
  { code: "es", name: "Spain" },
  { code: "it", name: "Italy" },
  { code: "nl", name: "Netherlands" },
  { code: "se", name: "Sweden" },
  { code: "no", name: "Norway" },
];
