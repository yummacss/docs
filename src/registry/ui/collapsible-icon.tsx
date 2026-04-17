"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Collapsible } from "@base-ui/react/collapsible";
import {
  Check,
  ChevronRight,
  CircleCheckFill,
  PersonPlus,
} from "@gravity-ui/icons";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export default function CollapsibleIcon() {
  const [open, setOpen] = React.useState(false);
  const [followed, setFollowed] = React.useState(
    whoToFollow.users.reduce(
      (acc, user) => ({ ...acc, [user.name]: false }),
      {} as Record<string, boolean>,
    ),
  );

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
                <div className="p-r">
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
                  {user.verified && (
                    <span className="d-f p-a b-0 r-0 ai-c jc-c w-3 h-3 bg-white bc-white br-pill bw-1">
                      <CircleCheckFill className="c-indigo" />
                    </span>
                  )}
                </div>
                <div className="d-f fd-c g-0">
                  <span className="c-slate-10 fs-sm fw-500">{user.name}</span>
                  <span className="c-slate-6 fs-xs">@{user.handle}</span>
                </div>
              </div>
              {followed[user.name] ? (
                <Button
                  className="d-f ai-c jc-c w-8 h-8 bg-transparent bc-indigo c-indigo br-pill bw-1 tp-c tdu-150 ttf-io us-none fv:bg-indigo-1"
                  aria-label={`Unfollow ${user.name}`}
                  onClick={() =>
                    setFollowed((prev) => ({ ...prev, [user.name]: false }))
                  }
                >
                  <Check className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  className="d-f ai-c jc-c w-8 h-8 bg-indigo fv:bg-indigo-8 h:bg-indigo-8 c-white br-pill tp-c tdu-150 ttf-io us-none"
                  aria-label={`Follow ${user.name}`}
                  onClick={() =>
                    setFollowed((prev) => ({ ...prev, [user.name]: true }))
                  }
                >
                  <PersonPlus className="w-4 h-4" />
                </Button>
              )}
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
      name: "Sarah",
      handle: "sarahc",
      avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sarah",
      verified: true,
    },
    {
      name: "Avery",
      handle: "averyg",
      avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Avery",
      verified: true,
    },
    {
      name: "Jude",
      handle: "judem",
      avatar: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jude",
      verified: false,
    },
  ],
};
