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
                  className={`d-f ai-c g-2 py-2 px-3 fs-sm fw-600 c-slate-8 us-none c-d c-p br-lg mx-1 ${
                    state.highlighted ? "bg-silver-1" : "h:bg-silver-1"
                  }`}
                >
                  <Avatar.Root className="d-if o-h ai-c jc-c w-6 h-6 br-pill us-none bc-silver-3 bw-1">
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
];
