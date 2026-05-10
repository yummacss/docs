"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Collapsible } from "@base-ui/react/collapsible";
import { Toggle } from "@base-ui/react/toggle";
import { Check, ChevronRight, Plus } from "@gravity-ui/icons";
import { useState } from "react";

export default function CollapsibleStatic() {
  const [open, setOpen] = useState(false);
  const [followed, setFollowed] = useState<Record<string, boolean>>(
    Object.fromEntries(
      teamMembers.users.map((user, index) => [user.name, index === 0]),
    ),
  );

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-72 c-slate-10 br-xl"
    >
      <Collapsible.Trigger className="d-f ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-lg bw-1 fs-sm fw-500 c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-5">
        <ChevronRight className={`w-3 h-3 ${open ? "ro-90" : "ro-0"}`} />
        {teamMembers.title}
      </Collapsible.Trigger>

      <Collapsible.Panel className="d-b o-h h-auto">
        <div className="d-f fd-c g-3 mt-1 py-3 px-3 bg-white bc-silver-2 br-xl bw-1">
          {teamMembers.users.map((user) => (
            <div key={user.name} className="d-f ai-c jc-sb">
              <div className="d-f ai-c g-3">
                <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 bc-white br-pill bw-1 va-m us-none">
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
                  <span className="c-slate-10 fs-sm fw-500">{user.name}</span>
                  <span className="c-slate-6 fs-xs">{user.role}</span>
                </div>
              </div>
              <Toggle
                pressed={followed[user.name]}
                className={`d-f ai-c jc-c w-8 h-8 p-0 br-pill us-none ${
                  followed[user.name]
                    ? "bg-indigo c-white"
                    : "bg-white bc-indigo c-indigo bw-1"
                }`}
                aria-label={`Add ${user.name}`}
                onClick={() =>
                  setFollowed((prev) => ({
                    ...prev,
                    [user.name]: !prev[user.name],
                  }))
                }
              >
                {followed[user.name] ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </Toggle>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const teamMembers = {
  title: "Invite members",
  users: [
    {
      name: "Sarah",
      role: "Frontend Developer",
      avatar:
        "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
    },
    {
      name: "John",
      role: "Backend Developer",
      avatar:
        "https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2",
    },
    {
      name: "Noah",
      role: "Project Manager",
      avatar:
        "https://api.dicebear.com/9.x/open-peeps/svg?seed=Noah&backgroundColor=D0D1FB",
    },
  ],
};
