"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight } from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function CollapsibleBordered() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="d-f o-h fd-c w-72 bg-white bc-silver-3 bw-1 br-lg"
    >
      <Collapsible.Trigger className="d-f b-0 ai-c jc-sb g-2 w-full px-4 py-3 bg-transparent bw-0 ta-l c-p h:bg-silver-1">
        <span className="c-slate-9 fs-sm fw-500">{whoToFollow.title}</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="d-f"
        >
          <ChevronRight className="w-4 h-4 c-slate-4" />
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
        <div className="d-f fd-c g-3 px-4 py-3 bc-silver-3 btw-1">
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
                  <span className="c-slate-10 fs-sm fw-500">{user.name}</span>
                  <span className="c-slate-6 fs-xs">@{user.handle}</span>
                </div>
              </div>
              <Button className="d-f ai-c jc-c h-7 px-3 bg-indigo fv:bg-indigo-8 h:bg-indigo-8 c-white br-pill fs-xs fw-500 tp-c tdu-150 ttf-io us-none">
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
  ],
};
