"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Avatar } from "@base-ui/react/avatar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AutocompleteSquare() {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete.Root items={teamMembers} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label
          htmlFor="autocomplete-square-input"
          className="c-slate-10 fs-sm fw-500"
        >
          Assign member
        </label>
        <Autocomplete.Input
          id="autocomplete-square-input"
          placeholder="Search team members"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
        />
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
                <Autocomplete.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 bs-o-xs">
                  <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                    {(member: TeamMember) => (
                      <Autocomplete.Item
                        key={member.avatar}
                        value={member.name}
                        render={(props, state) => (
                          <div
                            {...props}
                            className={`d-f ai-c g-3 py-2 px-3 mx-1 c-slate-10 fs-sm us-none c-p ${
                              state.highlighted
                                ? "bg-silver-1/50"
                                : "bg-transparent"
                            }`}
                          >
                            <Avatar.Root className="w-6 h-6 bc-white bw-1">
                              <Avatar.Image
                                src={member.avatar}
                                className="of-c w-100% h-100%"
                              />
                              <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% bg-silver-2 c-slate-8 fs-xs">
                                {member.name[0]}
                              </Avatar.Fallback>
                            </Avatar.Root>
                            <div className="d-f fd-c">
                              <span className="fw-500">{member.name}</span>
                              <span className="c-slate-6 fs-xs">
                                {member.role}
                              </span>
                            </div>
                          </div>
                        )}
                      />
                    )}
                  </Autocomplete.List>
                  <Autocomplete.Empty className="c-slate-6 fs-sm">
                    <div className="pt-2 pb-3 px-4 us-none">
                      No members found.
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

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "John",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
  },
  {
    name: "John",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=B4E9F2",
  },
  {
    name: "Noah",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
  },
  {
    name: "Melanie",
    role: "DevOps Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    name: "Riley",
    role: "Product Manager",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Riley&backgroundColor=F4C8FA",
  },
  {
    name: "Adrian",
    role: "QA Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    name: "Jessica",
    role: "UX Researcher",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jessica&backgroundColor=DAF0B9",
  },
  {
    name: "Aiden",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aiden&backgroundColor=B4E9F2",
  },
  {
    name: "Liam",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Liam&backgroundColor=D0D1FB",
  },
  {
    name: "Maria",
    role: "Engineering Lead",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Maria&backgroundColor=DCCEFC",
  },
  {
    name: "Vivian",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Vivian&backgroundColor=F4C8FA",
  },
  {
    name: "Wyatt",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Wyatt&backgroundColor=FFD4DE",
  },
];
