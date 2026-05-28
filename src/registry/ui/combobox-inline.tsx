"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Combobox } from "@base-ui/react/combobox";
import { Check, Search, Xmark } from "iconoir-react";

function ItemIcon({
  selected,
  className = "",
}: {
  selected: boolean;
  className?: string;
}) {
  if (!selected) return null;
  return <Check className={`fs-0 w-4 h-4 c-indigo-6 ${className}`} />;
}

export default function ComboboxInline() {
  return (
    <div className="d-f fd-c g-2 c-slate-10 fs-sm">
      <label className="fw-500">Assign member</label>
      <div className="d-f o-h fd-c g-0 w-64 bg-white bc-silver-3 bw-1 br-md bs-o-xs">
        <Combobox.Root inline items={users}>
          <div className="d-f ai-c g-2 px-3 bc-silver-3 bbw-1">
            <Search className="fs-0 w-4 h-4 c-slate-4" />
            <div className="p-r fg-1">
              <Combobox.Input
                placeholder="Search team members"
                className="h-10 pl-4 pr-10 w-100% bg-transparent c-slate-10 bw-0 fs-md fv:oo--1 fv:oc-indigo-5"
              />
              <div className="d-f p-a r-2 b-0 ai-c jc-c h-10 c-slate-6">
                <Combobox.Clear
                  className="d-f b-0 ai-c jc-c w-6 h-6 p-0 bg-transparent c-slate-6 br-sm c-p h:c-slate-10"
                  aria-label="Clear selection"
                >
                  <Xmark className="w-4 h-4" />
                </Combobox.Clear>
              </div>
            </div>
          </div>
          <Combobox.List className="oy-auto py-1 max-h-52">
            {(user: User) => (
              <Combobox.Item
                key={user.name}
                value={user.name}
                render={(props, state) => (
                  <div
                    {...props}
                    className={`d-f ai-c g-2 py-2 px-3 fs-sm fw-500 c-slate-8 us-none c-p br-md mx-1 ${
                      state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                    }`}
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
                    <span className="fg-1">{user.name}</span>
                    <span className="c-slate-6 fw-400">{user.role}</span>
                    <ItemIcon selected={state.selected} className="ml-auto" />
                  </div>
                )}
              />
            )}
          </Combobox.List>
        </Combobox.Root>
      </div>
    </div>
  );
}

interface User {
  name: string;
  role: string;
  avatar: string;
}

const users: User[] = [
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
  {
    name: "Jessica",
    role: "UX Researcher",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jessica&backgroundColor=DAF0B9",
  },
  {
    name: "Aiden",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Aiden&backgroundColor=B4E9F2",
  },
  {
    name: "Liam",
    role: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Liam&backgroundColor=D0D1FB",
  },
  {
    name: "Maria",
    role: "Engineering Lead",
    avatar:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Maria&backgroundColor=DCCEFC",
  },
];
