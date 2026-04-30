"use client";

import { Avatar } from "@base-ui/react/avatar";

export default function AvatarStackCompact() {
  return (
    <div className="d-f ai-c p-px bg-white bc-silver-3 bw-1 br-pill">
      {stackMembers.map((member, index) => (
        <Avatar.Root
          key={member.name}
          className={`d-if o-h ai-c jc-c w-10 h-10 bg-silver-1 bc-white br-pill bw-1 va-m us-none ${index > 0 ? "ml--2" : ""}`}
        >
          <Avatar.Image
            src={member.avatarUrl}
            alt={member.name}
            className="of-c w-full h-full"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
            {member.initials}
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
      <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-md fw-400">
          +{extraCount}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
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
];

const extraCount = 3;
