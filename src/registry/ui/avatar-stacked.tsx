import { Plus } from "iconoir-react";
import Avatar from "./avatar";
import Tooltip from "./tooltip";

export default function AvatarStacked() {
  return (
    <div className="d-f ai-c">
      {stackMembers.map((member, index) => (
        <Avatar
          key={member.avatarUrl}
          size="sm"
          src={member.avatarUrl}
          name={member.name}
          className={index > 0 ? "ml--2" : ""}
        />
      ))}
      <Avatar size="sm" fallback={`+${extraCount}`} className="ml--2" />
      <Tooltip
        trigger={<Plus className="w-6 h-6" />}
        triggerLabel="Add participant"
        content="Add participant"
        delay={300}
        // Only utilities TooltipBase's own trigger classes leave unset: it
        // already owns background, border-width and text color, and a
        // caller-supplied class cannot reliably beat those (see the `tint`
        // comment in avatar.tsx) - so this reaches for size, spacing and
        // shape instead of trying to fight them.
        className="w-8 h-8 ml-2 br-9999 bs-d tp-c tdu-150 ttf-io h:bg-silver-1/50"
      />
    </div>
  );
}

const stackMembers = [
  {
    name: "Adrian",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    name: "Aidan",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aidan&backgroundColor=FFD4DE",
  },
  {
    name: "Jade",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jade&backgroundColor=DAF0B9",
  },
  {
    name: "Jessica",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jessica&backgroundColor=DAF0B9",
  },
];

const extraCount = 3;
