"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Combobox } from "@base-ui/react/combobox";
import { ArrowSeparateVertical, Check, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ComboboxSm() {
  const [open, setOpen] = useState(false);

  return (
    <Combobox.Root items={users} open={open} onOpenChange={setOpen}>
      <div className="d-f p-r fd-c g-2 c-slate-10 fs-sm">
        <label htmlFor="user-input" className="fw-500">
          Assign member
        </label>
        <div className="p-r">
          <Combobox.Input
            id="user-input"
            placeholder="Search team members"
            className="h-8 w-56 pl-4 pr-16 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-8 c-slate-6">
            <Combobox.Clear
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10 fv:oo--1 fv:oc-indigo-5"
              aria-label="Clear selection"
            >
              <Xmark className="w-4 h-4" />
            </Combobox.Clear>
            <Combobox.Trigger
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10 fv:oo--1 fv:oc-indigo-5"
              aria-label="Open popup"
            >
              <ArrowSeparateVertical className="w-4 h-4" />
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
                <Combobox.Popup className="o-h w-56 bg-white bc-silver-2 c-slate-10 bw-1 br-lg bs-o-xs">
                  <Combobox.List className="oy-auto py-1 max-h-72 ow-0">
                    {(user: User) => (
                      <Combobox.Item
                        key={user.avatar}
                        value={user.name}
                        className={(state) =>
                          `d-f ai-c g-2 py-2 px-3 fs-sm fw-500 us-none c-p br-md mx-1 ${
                            state.highlighted
                              ? "bg-silver-2/50"
                              : "bg-transparent"
                          }`
                        }
                      >
                        <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 bc-white br-9999 bw-1 us-none">
                          <Avatar.Image
                            src={user.avatar}
                            alt={user.name}
                            className="of-c w-100% h-100%"
                          />
                          <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
                            {user.name[0]}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <span className="fg-1 min-w-0 o-h to-e ws-nw">{user.name}</span>
                        <span className="fs-0 c-slate-6 fw-400">{user.role}</span>
                        <Combobox.ItemIndicator className="d-f ml-auto c-indigo">
                          <Check className="w-3 h-3" />
                        </Combobox.ItemIndicator>
                      </Combobox.Item>
                    )}
                  </Combobox.List>
                  <Combobox.Empty className="c-slate-6 fs-sm">
                    <div className="py-4 px-4">No users found.</div>
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

interface User {
  name: string;
  role: string;
  avatar: string;
}

const users: User[] = [
  {
    name: "Adrian",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    name: "Aidan",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aidan&backgroundColor=FFD4DE",
  },
  {
    name: "Jade",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jade&backgroundColor=DAF0B9",
  },
  {
    name: "Jessica",
    role: "UX Researcher",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jessica&backgroundColor=DAF0B9",
  },
  {
    name: "Jocelyn",
    role: "QA Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jocelyn&backgroundColor=DAF0B9",
  },
  {
    name: "John",
    role: "Product Manager",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
  },
  {
    name: "Katherine",
    role: "DevOps Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Katherine&backgroundColor=F4C8FA",
  },
  {
    name: "Liam",
    role: "Engineering Lead",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Liam&backgroundColor=D0D1FB",
  },
  {
    name: "Liliana",
    role: "Data Analyst",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Liliana&backgroundColor=DCCEFC",
  },
  {
    name: "Maria",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Maria&backgroundColor=DCCEFC",
  },
  {
    name: "Melanie",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    name: "Noah",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
  },
];
