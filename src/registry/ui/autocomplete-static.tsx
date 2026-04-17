"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Avatar } from "@base-ui/react/avatar";
import * as React from "react";

export default function AutocompleteStatic() {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete.Root items={USERS} open={open} onOpenChange={setOpen}>
      <div className="d-f fd-c g-2">
        <label
          htmlFor="autocomplete-input-static"
          className="c-slate-10 fs-sm fw-600"
        >
          Mention user
        </label>
        <Autocomplete.Input
          id="autocomplete-input-static"
          placeholder="e.g. Sarah"
          className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-12 bw-1 br-lg fs-md bs-o-xs fv:ow-2 fv:oo--1 fv:oc-indigo-6"
        />
      </div>

      <Autocomplete.Portal keepMounted>
        <Autocomplete.Positioner className="ow-0" sideOffset={4}>
          <Autocomplete.Popup className="o-h w-64 bg-white bc-silver-2 c-slate-10 bw-1 br-xl bs-o-lg">
            <Autocomplete.List className="oy-auto max-h-72 py-1 ow-0">
              {(user: User) => (
                <Autocomplete.Item
                  key={user.name}
                  value={user.name}
                  render={(props, state) => (
                    <div
                      {...props}
                      className={`d-f ai-c jc-sb g-3 py-2 px-3 fs-sm us-none c-p br-lg mx-1 c-slate-10 ${
                        state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                      }`}
                    >
                      <div className="d-f ai-c g-3">
                        <Avatar.Root className="w-6 h-6 bc-silver-3 br-pill bw-1">
                          <Avatar.Image
                            src={user.avatar}
                            className="of-c w-full h-full br-pill"
                          />
                          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full bg-silver-2 c-slate-8 fs-xs">
                            {user.name[0]}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <span className="fw-600">{user.name}</span>
                      </div>
                      <span className="c-slate-6 fw-400">@{user.handle}</span>
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
    </Autocomplete.Root>
  );
}

interface User {
  name: string;
  handle: string;
  avatar: string;
}

const USERS: User[] = [
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
    handle: "judet",
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
    handle: "jessicap",
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
    handle: "vivianh",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Vivian",
  },
  {
    name: "Wyatt",
    handle: "wyattk",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Wyatt",
  },
  {
    name: "Jade",
    handle: "jadel",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jade",
  },
  {
    name: "Nolan",
    handle: "nolans",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Nolan",
  },
  {
    name: "Sophia",
    handle: "sophiac",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sophia",
  },
  {
    name: "Liliana",
    handle: "lilianar",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Liliana",
  },
  {
    name: "Katherine",
    handle: "katherinep",
    avatar:
      "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Katherine",
  },
  {
    name: "Aidan",
    handle: "aidanj",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Aidan",
  },
  {
    name: "Jocelyn",
    handle: "jocelynm",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jocelyn",
  },
  {
    name: "Sadie",
    handle: "sadiel",
    avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sadie",
  },
];
