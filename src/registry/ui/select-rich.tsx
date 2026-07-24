"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { ArrowSeparateVertical, Check } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function SelectRich() {
  const [open, setOpen] = useState(false);

  return (
    <Field.Root className="d-f fd-c g-2">
      <label
        htmlFor="select-enriched"
        className="c-slate-10 fs-sm fw-500 us-none"
      >
        Assign to
      </label>
      <Select.Root defaultValue={null} open={open} onOpenChange={setOpen}>
        <Select.Trigger
          id="select-enriched"
          className={`d-f ai-c jc-sb h-10 w-64 bw-1 bc-silver-3 br-lg bg-white px-3 c-slate-10 us-none c-p bs-o-xs fv:oo--1 fv:oc-indigo-5 ${
            open ? "bg-silver-2/50" : "bg-transparent"
          }`}
        >
          <Select.Value>
            {(value) => (
              <span className="min-w-0 o-h to-e ws-nw">
                {value
                  ? members.find((m) => m.name === value)?.name
                  : "Select member..."}
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
                  className="py-1 w-68 bg-white bc-silver-2 bw-1 br-lg bs-o-xs"
                >
                  <Select.List className="p-r o-auto">
                    {members.map(({ name, role, avatar }) => (
                      <Select.Item
                        key={name}
                        value={name}
                        className={(state) =>
                          `d-f ai-c g-3 py-2 px-3 fs-sm us-none c-p br-md mx-1 c-slate-10 fw-500 ${state.highlighted ? "bg-silver-2/50" : "bg-transparent"}`
                        }
                      >
                        <Select.ItemIndicator className="d-f ai-c">
                          <Check className="w-4 h-4" />
                        </Select.ItemIndicator>
                        <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 bc-white br-9999 bw-1 va-m us-none">
                          <Avatar.Image
                            src={avatar}
                            alt={name}
                            className="of-c w-100% h-100%"
                          />
                          <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
                            {name[0]}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <div className="d-f fd-c">
                          <Select.ItemText className="fw-500">
                            {name}
                          </Select.ItemText>
                          <span className="c-slate-5 fs-xs">{role}</span>
                        </div>
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

const members = [
  {
    name: "Taylor",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Taylor&backgroundColor=D0D1FB",
  },
  {
    name: "Alex",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Alex&backgroundColor=F4C8FA",
  },
  {
    name: "Jordan",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jordan&backgroundColor=DAF0B9",
  },
  {
    name: "Morgan",
    role: "UX Researcher",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Morgan&backgroundColor=FFD4DE",
  },
  {
    name: "Riley",
    role: "Engineering Lead",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Riley&backgroundColor=DCCEFC",
  },
];
