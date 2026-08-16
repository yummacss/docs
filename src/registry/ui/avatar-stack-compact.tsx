import Avatar from "./avatar";

export default function AvatarStackCompact() {
  return (
    <div className="d-f ai-c p-px bg-white bc-silver-3 br-9999 bw-1">
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
];

const extraCount = 3;
