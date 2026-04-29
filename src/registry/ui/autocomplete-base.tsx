"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Avatar } from "@base-ui/react/avatar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AutocompleteBase() {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete.Root items={users} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label htmlFor="autocomplete-input" className="c-slate-10 fs-sm fw-500">
          Mention user
        </label>
        <Autocomplete.Input
          id="autocomplete-input"
          placeholder="e.g. Sarah"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo--1 fv:oc-indigo-6"
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
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
                  {(user: User) => (
                    <Autocomplete.Item
                      key={user.name}
                      value={user.name}
                      render={(props, state) => (
                        <div
                          {...props}
                          className={`d-f ai-c jc-sb g-3 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                            state.highlighted
                              ? "bg-silver-1/50"
                              : "bg-transparent"
                          }`}
                        >
                          <div className="d-f ai-c g-3">
                            <Avatar.Root className="w-6 h-6 bc-white br-pill bw-1">
                              <Avatar.Image
                                src={user.avatar}
                                className="of-c w-full h-full br-pill"
                              />
                              <Avatar.Fallback className="d-f ai-c jc-c w-full h-full bg-silver-2 c-slate-8 fs-xs">
                                {user.name[0]}
                              </Avatar.Fallback>
                            </Avatar.Root>
                            <span className="fw-500">{user.name}</span>
                          </div>
                          <span className="c-slate-6 fw-400">
                            @{user.handle}
                          </span>
                        </div>
                      )}
                    />
                  )}
                </Autocomplete.List>
                <Autocomplete.Empty className="c-slate-6 fs-sm">
                  <div className="pt-2 pb-3 px-4 us-none">No users found.</div>
                </Autocomplete.Empty>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        )}
      </AnimatePresence>
    </Autocomplete.Root>
  );
}

interface User {
  name: string;
  handle: string;
  avatar: string;
}

const users: User[] = [
  {
    name: "Sarah",
    handle: "sarah",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
  },
  {
    name: "John",
    handle: "john",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2",
  },
  {
    name: "Noah",
    handle: "noah",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Noah&backgroundColor=D0D1FB",
  },
  {
    name: "Melanie",
    handle: "leok",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    name: "Riley",
    handle: "rileyb",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Riley&backgroundColor=F4C8FA",
  },
  {
    name: "Adrian",
    handle: "adrianm",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    name: "Jessica",
    handle: "jessicap",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jessica&backgroundColor=DAF0B9",
  },
  {
    name: "Aiden",
    handle: "aidenw",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Aiden&backgroundColor=B4E9F2",
  },
  {
    name: "Liam",
    handle: "liamj",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Liam&backgroundColor=D0D1FB",
  },
  {
    name: "Maria",
    handle: "mariav",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Maria&backgroundColor=DCCEFC",
  },
  {
    name: "Vivian",
    handle: "vivianh",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Vivian&backgroundColor=F4C8FA",
  },
  {
    name: "Wyatt",
    handle: "wyattk",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Wyatt&backgroundColor=FFD4DE",
  },
  {
    name: "Jade",
    handle: "jadel",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jade&backgroundColor=DAF0B9",
  },
  {
    name: "Nolan",
    handle: "nolans",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Nolan&backgroundColor=B4E9F2",
  },
  {
    name: "Sophia",
    handle: "sophiac",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sophia&backgroundColor=D0D1FB",
  },
  {
    name: "Liliana",
    handle: "lilianar",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Liliana&backgroundColor=DCCEFC",
  },
  {
    name: "Katherine",
    handle: "katherinep",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Katherine&backgroundColor=F4C8FA",
  },
  {
    name: "Aidan",
    handle: "aidanj",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Aidan&backgroundColor=FFD4DE",
  },
  {
    name: "Jocelyn",
    handle: "jocelynm",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jocelyn&backgroundColor=DAF0B9",
  },
  {
    name: "Sadie",
    handle: "sadiel",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sadie&backgroundColor=B4E9F2",
  },
];
