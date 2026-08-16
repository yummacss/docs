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
        trigger={<Plus className="w-4 h-4" />}
        triggerLabel="Add participant"
        content="Add participant"
        delay={300}
        arrow
        className="w-6 h-6 ml-2 br-9999 bw-1 bc-silver-3 bs-d tp-c tdu-150 ttf-io h:bg-silver-1/50"
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
