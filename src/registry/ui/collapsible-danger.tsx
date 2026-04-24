"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Toggle } from "@base-ui/react/toggle";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight, Lock, LockOpen } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import { useState } from "react";

export default function CollapsibleDanger() {
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(
    blockedUsers.users.reduce(
      (acc, user) => ({ ...acc, [user.name]: true }),
      {} as Record<string, boolean>,
    ),
  );

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f fd-c w-72 c-slate-10 br-xl"
    >
      <Collapsible.Trigger className="d-f b-0 ai-c g-2 px-3 py-2 bg-white bc-silver-2 c-slate-10 br-lg bw-1 fs-sm fw-500 c-p h:bg-silver-1/50 fv:ow-2 fv:oo-2 fv:oc-indigo-6">
        <span className="c-slate-9 fs-sm fw-500">{blockedUsers.title}</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="d-f"
        >
          <ChevronRight className="w-3 h-3" />
        </motion.span>
      </Collapsible.Trigger>

      <Collapsible.Panel
        keepMounted
        render={(props) => (
          <motion.div
            {...(props as HTMLMotionProps<"div">)}
            initial={false}
            animate={
              open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="d-b o-h"
          />
        )}
      >
        <div className="d-f fd-c g-3 mt-1 py-3 px-3 bg-white bc-silver-2 br-xl bw-1">
          {blockedUsers.users.map((user) => (
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
                  <span className="c-slate-6 fs-xs">@{user.handle}</span>
                </div>
              </div>
              <Toggle
                pressed={blocked[user.name]}
                className={`d-f ai-c jc-c w-8 h-8 p-0 br-pill tp-c tdu-150 ttf-io us-none ${
                  blocked[user.name]
                    ? "bg-red fv:bg-red-8 h:bg-red-8 c-white"
                    : "bg-white bc-red c-red bw-1"
                }`}
                aria-label={`Unblock ${user.name}`}
                onClick={() =>
                  setBlocked((prev) => ({ ...prev, [user.name]: !prev[user.name] }))
                }
              >
                {blocked[user.name] ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <LockOpen className="w-4 h-4" />
                )}
              </Toggle>
            </div>
          ))}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

const blockedUsers = {
  title: "Blocked users",
  users: [
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
  ],
};
