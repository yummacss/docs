"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Tooltip } from "@base-ui/react/tooltip";
import { AnimatePresence, motion } from "motion/react";

export default function AvatarCompact() {
  return (
    <Tooltip.Provider>
      <div className="d-f ai-c px-3 py-2 bg-white bc-silver-2 br-pill bw-1">
        {compactMembers.map((member, index) => (
          <Tooltip.Root key={member.name}>
            <Tooltip.Trigger
              className={`d-if o-h ai-c jc-c w-8 h-8 bg-silver-1 bc-silver-3 br-full bw-1 va-m us-none ${index > 0 ? "ml--2" : ""}`}
            >
              <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 va-m">
                <Avatar.Image
                  src={member.avatarUrl}
                  alt={member.name}
                  className="of-c w-full h-full"
                />
                <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-xs fw-500">
                  {member.initials}
                </Avatar.Fallback>
              </Avatar.Root>
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
                    {member.name}
                  </Tooltip.Popup>
                </AnimatePresence>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
        <Avatar.Root className="d-if o-h ai-c jc-c w-8 h-8 ml--2 bg-silver-1 bc-silver-3 br-full bw-1 va-m us-none">
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-xs fw-600">
            +3
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
    </Tooltip.Provider>
  );
}

const compactMembers = [
  {
    name: "Sarah",
    initials: "S",
    avatarUrl: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sarah",
  },
  {
    name: "Avery",
    initials: "A",
    avatarUrl: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Avery",
  },
  {
    name: "Jude",
    initials: "J",
    avatarUrl: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jude",
  },
];
