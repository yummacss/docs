import Avatar from "./avatar";

export default function AvatarStatus() {
  return (
    <div className="d-f ai-c g-4">
      {statusMembers.map((member) => (
        <Avatar
          key={member.avatarUrl}
          src={member.avatarUrl}
          name={member.name}
          status={member.status}
        />
      ))}
    </div>
  );
}

const statusMembers = [
  {
    name: "Adrian",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
    status: "online" as const,
  },
  {
    name: "Aidan",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aidan&backgroundColor=FFD4DE",
    status: "offline" as const,
  },
  {
    name: "Jade",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jade&backgroundColor=DAF0B9",
    status: "busy" as const,
  },
];
