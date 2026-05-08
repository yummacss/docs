"use client";

import { Combobox } from "@base-ui/react/combobox";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ComboboxGrouped() {
  const [open, setOpen] = useState(false);

  return (
    <Combobox.Root items={memberGroups} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="grouped-input" className="c-slate-10 fs-sm fw-500">
          Assign team member
        </label>
        <Combobox.Input
          id="grouped-input"
          placeholder="Search by name or role..."
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
      </div>

      <AnimatePresence>
        {open && (
          <Combobox.Portal keepMounted>
            <Combobox.Positioner sideOffset={4}>
              <Combobox.Popup
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
                <Combobox.List className="oy-auto max-h-72 py-1">
                  {(group: MemberGroup) => (
                    <Combobox.Group key={group.value}>
                      <div className="mx-1 px-3 py-2 bg-silver-1 bc-silver-2 btr-lg bw-1">
                        <span className="c-slate-6 fs-xs fw-500 tt-u ls-3">
                          {group.value}
                        </span>
                      </div>
                      {group.items.map((member) => (
                        <Combobox.Item
                          key={member.name}
                          value={member.name}
                          render={(props, state) => (
                            <div
                              {...props}
                              className={`d-f ai-c g-3 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                                state.highlighted
                                  ? "bg-silver-1/50"
                                  : "bg-transparent"
                              }`}
                            >
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-8 h-8 of-c br-pill"
                              />
                              <div className="d-f fd-c">
                                <span className="fw-500">{member.name}</span>
                                <span className="c-slate-6 fs-xs">
                                  {member.role}
                                </span>
                              </div>
                            </div>
                          )}
                        />
                      ))}
                    </Combobox.Group>
                  )}
                </Combobox.List>
                <Combobox.Empty className="c-slate-6 fs-sm">
                  <div className="py-4 px-4">No members found.</div>
                </Combobox.Empty>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
  );
}

interface Member {
  name: string;
  role: string;
  avatar: string;
}

interface MemberGroup {
  value: string;
  items: Member[];
}

const memberGroups: MemberGroup[] = [
  {
    value: "Product",
    items: [
      {
        name: "Sarah",
        role: "Product Manager",
        avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
      },
      {
        name: "Noah",
        role: "Designer",
        avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Noah&backgroundColor=D0D1FB",
      },
    ],
  },
  {
    value: "Engineering",
    items: [
      {
        name: "Adrian",
        role: "Frontend Developer",
        avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Adrian&backgroundColor=FFD4DE",
      },
      {
        name: "Maria",
        role: "Backend Developer",
        avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Maria&backgroundColor=DCCEFC",
      },
      {
        name: "Jessica",
        role: "DevOps Engineer",
        avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jessica&backgroundColor=DAF0B9",
      },
      {
        name: "Liam",
        role: "QA Engineer",
        avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Liam&backgroundColor=D0D1FB",
      },
    ],
  },
  {
    value: "Support",
    items: [
      {
        name: "Riley",
        role: "Customer Success",
        avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Riley&backgroundColor=F4C8FA",
      },
      {
        name: "Wyatt",
        role: "Support Lead",
        avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Wyatt&backgroundColor=FFD4DE",
      },
    ],
  },
];