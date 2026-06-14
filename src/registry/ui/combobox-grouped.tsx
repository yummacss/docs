"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Combobox } from "@base-ui/react/combobox";
import { ArrowSeparateVertical, Check, Xmark } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ComboboxGrouped() {
  const [open, setOpen] = useState(false);

  return (
    <Combobox.Root items={teamGroups} open={open} onOpenChange={setOpen}>
      <div className="d-f p-r fd-c g-2 c-slate-10 fs-sm">
        <label htmlFor="grouped-input" className="fw-500">
          Assign team member
        </label>
        <div className="p-r">
          <Combobox.Input
            id="grouped-input"
            placeholder="Search by name or role..."
            className="h-10 w-64 pl-4 pr-16 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-10 c-slate-6">
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
                className="d-f ai-c"
              >
                <Combobox.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-md bs-o-xs">
                  <Combobox.List className="oy-auto max-h-72 py-1 ow-0">
                    {(group: TeamGroup, groupIndex: number) => (
                      <Combobox.Group key={group.value}>
                        {group.items.map((member) => (
                          <Combobox.Item
                            key={member.name}
                            value={member.name}
                            className={(state) =>
                              `d-f ai-c g-3 py-2 px-3 fs-sm us-none c-p br-md mx-1 c-slate-10 ${
                                state.highlighted
                                  ? "bg-silver-1/50"
                                  : "bg-transparent"
                              }`
                            }
                          >
                            <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 bc-white br-9999 bw-1 us-none">
                              <Avatar.Image
                                src={member.avatar}
                                alt={member.name}
                                className="of-c w-100% h-100%"
                              />
                              <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-xs">
                                {member.name[0]}
                              </Avatar.Fallback>
                            </Avatar.Root>
                            <div className="d-f fd-c min-w-0">
                              <span className="o-h fw-500 to-e ws-nw">{member.name}</span>
                              <span className="c-slate-6 fs-xs">
                                {member.role}
                              </span>
                            </div>
                            <Combobox.ItemIndicator className="d-f ml-auto c-indigo">
                              <Check className="w-3 h-3" />
                            </Combobox.ItemIndicator>
                          </Combobox.Item>
                        ))}
                        {groupIndex < teamGroups.length - 1 && (
                          <div className="w-100% h-px my-1 bg-silver-2" />
                        )}
                      </Combobox.Group>
                    )}
                  </Combobox.List>
                  <Combobox.Empty className="c-slate-6 fs-sm">
                    <div className="pt-2 pb-3 px-4 us-none">
                      No members found.
                    </div>
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

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface TeamGroup {
  value: string;
  items: TeamMember[];
}

const teamGroups: TeamGroup[] = [
  {
    value: "Frontend",
    items: [
      {
        name: "John",
        role: "Frontend Developer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
      },
      {
        name: "Noah",
        role: "UI Engineer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
      },
      {
        name: "Melanie",
        role: "React Developer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
      },
    ],
  },
  {
    value: "Backend",
    items: [
      {
        name: "Adrian",
        role: "Backend Developer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
      },
      {
        name: "Maria",
        role: "API Engineer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Maria&backgroundColor=DCCEFC",
      },
      {
        name: "Liam",
        role: "Node.js Developer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Liam&backgroundColor=D0D1FB",
      },
    ],
  },
  {
    value: "DevOps",
    items: [
      {
        name: "Jessica",
        role: "DevOps Engineer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Jessica&backgroundColor=DAF0B9",
      },
      {
        name: "Aiden",
        role: "SRE",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Aiden&backgroundColor=B4E9F2",
      },
      {
        name: "Wyatt",
        role: "Platform Engineer",
        avatar:
          "https://api.dicebear.com/9.x/notionists/svg?seed=Wyatt&backgroundColor=FFD4DE",
      },
    ],
  },
];
