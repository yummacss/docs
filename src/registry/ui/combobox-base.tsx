"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Combobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ComboboxBase() {
  const [open, setOpen] = React.useState(false);

  return (
    <Combobox.Root items={users} open={open} onOpenChange={setOpen}>
      <div className="d-f p-r fd-c g-2 c-slate-10 fs-sm">
        <label htmlFor="user-input" className="fw-600">
          Mention user
        </label>
        <div className="p-r">
          <Combobox.Input
            id="user-input"
            placeholder="e.g. @sarahc"
            className="h-10 w-64 pl-4 pr-16 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md fv:ow-2 fv:oo-2 fv:oc-indigo-6"
          />
          <div className="d-f p-a r-2 b-0 ai-c jc-c h-10 c-slate-6">
            <Combobox.Clear
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10"
              aria-label="Clear selection"
            >
              <Xmark className="w-4 h-4" />
            </Combobox.Clear>
            <Combobox.Trigger
              className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10"
              aria-label="Open popup"
            >
              <ChevronDown className="w-4 h-4" />
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
                className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg"
              >
                <Combobox.List className="oy-auto py-1 max-h-72 ow-0">
                  {(user: User) => (
                    <Combobox.Item
                      key={user.handle}
                      value={user.handle}
                      className={(state) =>
                        `d-f ai-c g-2 py-2 px-3 fs-sm fw-600 us-none c-p br-lg mx-1 ${
                          state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                        }`
                      }
                    >
                      <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 bc-silver-3 br-pill bw-1 us-none">
                        <Avatar.Image
                          src={user.avatar}
                          alt={user.name}
                          className="of-c w-full h-full"
                        />
                        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-xs">
                          {user.name[0]}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <span className="fg-1">{user.name}</span>
                      <span className="c-slate-6 fw-400">@{user.handle}</span>
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
            </Combobox.Positioner>
          </Combobox.Portal>
        )}
      </AnimatePresence>
    </Combobox.Root>
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
    handle: "sarahc",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sarah",
  },
  {
    name: "Avery",
    handle: "averyg",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Avery",
  },
  {
    name: "Jude",
    handle: "judem",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jude",
  },
  {
    name: "Leo",
    handle: "leok",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Leo",
  },
  {
    name: "Riley",
    handle: "rileyb",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Riley",
  },
  {
    name: "Adrian",
    handle: "adrianm",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Adrian",
  },
  {
    name: "Jessica",
    handle: "jessicam",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jessica",
  },
  {
    name: "Aiden",
    handle: "aidenw",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Aiden",
  },
  {
    name: "Liam",
    handle: "liamj",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Liam",
  },
  {
    name: "Maria",
    handle: "mariav",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Maria",
  },
  {
    name: "Vivian",
    handle: "vivianr",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Vivian",
  },
  {
    name: "Wyatt",
    handle: "wyattk",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Wyatt",
  },
];
