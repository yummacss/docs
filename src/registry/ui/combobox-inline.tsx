"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Combobox } from "@base-ui/react/combobox";
import { Check, Magnifier } from "@gravity-ui/icons";

function ItemIcon({
  selected,
  className = "",
}: {
  selected: boolean;
  className?: string;
}) {
  return selected ? (
    <Check className={`fs-0 w-4 h-4 c-indigo-6 ${className}`} />
  ) : (
    <Check className={`fs-0 w-4 h-4 c-transparent ${className}`} />
  );
}

export default function ComboboxInline() {
  return (
    <div className="d-f o-h fd-c g-0 w-64 bg-white bc-silver-3 bw-1 br-lg">
      <Combobox.Root inline items={users}>
        <div className="d-f ai-c g-2 px-3 bc-silver-3 bbw-1">
          <Magnifier className="fs-0 w-4 h-4 c-slate-4" />
          <Combobox.Input
            placeholder="Mention user..."
            className="f-1 h-10 bg-transparent c-slate-10 fs-md"
          />
        </div>
        <Combobox.List className="oy-auto py-1 max-h-52">
          {(user: User) => (
            <Combobox.Item
              key={user.handle}
              value={user.handle}
              render={(props, state) => (
                <div
                  {...props}
                  className={`d-f ai-c g-2 py-2 px-3 fs-sm fw-500 c-slate-8 us-none c-p br-lg mx-1 ${
                    state.highlighted ? "bg-silver-1/50" : "bg-transparent"
                  }`}
                >
                  <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 bc-white br-pill bw-1 us-none">
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
                  <ItemIcon selected={state.selected} className="ml-auto" />
                </div>
              )}
            />
          )}
        </Combobox.List>
      </Combobox.Root>
    </div>
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
    handle: "jessicam",
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
];
