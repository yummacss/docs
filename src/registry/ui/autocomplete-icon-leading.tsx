"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import {
  BellDot,
  CircleQuestionMark,
  Globe,
  Key,
  Search,
  UserRoundCog,
  UserRoundKey,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ComponentType, useState } from "react";

export default function AutocompleteIconLeading() {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete.Root items={settings} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="icon-leading-input" className="c-slate-10 fs-sm fw-500">
          Search settings
        </label>
        <div className="d-f p-r ai-c">
          <Search className="p-a l-3 w-4 h-4 c-slate-5" />
          <Autocomplete.Input
            id="icon-leading-input"
            placeholder="Account, Privacy, & more"
            className="h-10 w-64 pl-10 pr-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Autocomplete.Portal keepMounted>
            <Autocomplete.Positioner className="ow-0" sideOffset={8}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <Autocomplete.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs">
                  <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                    {(item: Setting) => (
                      <Autocomplete.Item
                        key={item.label}
                        value={item.label}
                        render={(props, state) => (
                          <div
                            {...props}
                            className={`d-f ai-c g-3 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`}
                          >
                            <item.icon className="w-4 h-4 c-slate-5" />
                            <span className="fw-500">{item.label}</span>
                          </div>
                        )}
                      />
                    )}
                  </Autocomplete.List>
                  <Autocomplete.Empty className="c-slate-6 fs-sm">
                    <div className="pt-2 pb-3 px-4 us-none">
                      No settings found.
                    </div>
                  </Autocomplete.Empty>
                </Autocomplete.Popup>
              </motion.div>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

type Setting = {
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const settings: Setting[] = [
  { label: "Account Settings", icon: UserRoundCog },
  { label: "Privacy & Security", icon: Key },
  { label: "Notifications", icon: BellDot },
  { label: "Language & Region", icon: Globe },
  { label: "Blocked Accounts", icon: UserRoundKey },
  { label: "Help Center", icon: CircleQuestionMark },
];
