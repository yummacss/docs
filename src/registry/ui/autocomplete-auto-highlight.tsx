"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AutocompleteAutoHighlight() {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete.Root
      items={teamMembers}
      open={open}
      onOpenChange={setOpen}
      autoHighlight
    >
      <div className="d-f fd-c g-2">
        <label
          htmlFor="auto-highlight-input"
          className="c-slate-10 fs-sm fw-500"
        >
          Assign task
        </label>
        <Autocomplete.Input
          id="auto-highlight-input"
          placeholder="Search team members"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo--1 fv:oc-indigo-5"
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
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-xs"
              >
                <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                  {(member: TeamMember) => (
                    <Autocomplete.Item
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
                            className="of-c w-6 h-6 bc-silver-3 br-pill bw-1"
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
                  )}
                </Autocomplete.List>
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="pt-2 pb-3 px-4 us-none">
                    No members found.
                  </div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
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
    name: "Sarah",
    role: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
  },
  {
    name: "John",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2",
  },
  {
    name: "Noah",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Noah&backgroundColor=D0D1FB",
  },
  {
    name: "Melanie",
    role: "DevOps Engineer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    name: "Riley",
    role: "Product Manager",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Riley&backgroundColor=F4C8FA",
  },
  {
    name: "Adrian",
    role: "QA Engineer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
];
