"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Tooltip } from "@base-ui/react/tooltip";
import { Plus } from "iconoir-react";
import { AnimatePresence, motion } from "motion/react";

export default function AvatarStacked() {
  return (
    <Tooltip.Provider delay={300}>
      <div className="d-f ai-c">
        {stackMembers.map((member, index) => (
          <Avatar.Root
            key={member.name}
            className={`d-if o-h ai-c jc-c w-10 h-10 bg-silver-1 bc-white br-9999 bw-1 va-m us-none ${index > 0 ? "ml--2" : ""}`}
          >
            <Avatar.Image
              src={member.avatarUrl}
              alt={member.name}
              className="of-c w-100% h-100%"
            />
            <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-9 fs-md fw-500">
              {member.initials}
            </Avatar.Fallback>
          </Avatar.Root>
        ))}
        <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 ml--2 bg-silver-1 bc-white br-9999 bw-1 va-m us-none">
          <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-md fw-500">
            +{extraCount}
          </Avatar.Fallback>
        </Avatar.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className="d-if ai-c jc-c w-10 h-10 ml-2 bg-transparent bc-silver-3 c-slate-6 br-9999 bs-d bw-1 tp-c tdu-150 ttf-io us-none h:bg-silver-1/50">
            <Plus className="w-6 h-6" />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={4}>
              <AnimatePresence>
                <Tooltip.Popup
                  render={
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  }
                  className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs bs-o-sm us-none"
                >
                  Add participant
                </Tooltip.Popup>
              </AnimatePresence>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  );
}

const stackMembers = [
  {
    name: "Sarah",
    initials: "S",
    avatarUrl:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
  },
  {
    name: "John",
    initials: "A",
    avatarUrl:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2",
  },
  {
    name: "Noah",
    initials: "J",
    avatarUrl:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Noah&backgroundColor=D0D1FB",
  },
  {
    name: "Melanie",
    initials: "L",
    avatarUrl:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
];

const extraCount = 3;
