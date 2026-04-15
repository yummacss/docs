"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight } from "@gravity-ui/icons";
import * as React from "react";

export default function CollapsibleStatic() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-72 c-slate-10 br-xl"
    >
      <Collapsible.Trigger className="d-f b-0 ai-c jc-sb w-full px-3 py-2 bg-white bc-silver-2 c-slate-10 br-lg bw-1 fs-sm fw-600 c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <div className="d-f ai-c g-2">
          <ChevronRight
            className={`w-3 h-3 ${open ? "ro-90" : "ro-0"} transition-all`}
          />
          {whoToFollow.title}
        </div>
      </Collapsible.Trigger>

      <Collapsible.Panel className="d-b o-h h-auto opacity-100">
        <div className="d-f fd-c g-3 mt-1 py-3 px-3 bg-white bc-silver-2 br-xl bw-1">
          {whoToFollow.users.map((user) => (
            <div key={user.name} className="d-f ai-c jc-sb">
              <div className="d-f ai-c g-3">
                <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 bc-silver-3 br-pill bw-1 va-m us-none">
                  <Avatar.Image
                    src={user.avatar}
                    alt={user.name}
                    className="of-c w-full h-full"
                  />
                  <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-xs">
                    {user.name[0]}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className="d-f fd-c g-0">
                  <span className="c-slate-10 fs-sm fw-600">{user.name}</span>
                  <span className="c-slate-6 fs-xs">@{user.handle}</span>
                </div>
              </div>
              <Button className="d-f ai-c jc-c h-7 px-3 bg-indigo fv:bg-indigo-8 h:bg-indigo-8 c-white br-pill fs-xs fw-600 tp-c tdu-150 ttf-io us-none">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const whoToFollow = {
  title: "Who to follow",
  users: [
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
  ],
};
