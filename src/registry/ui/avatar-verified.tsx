import Avatar from "./avatar";

export default function AvatarVerified() {
  return (
    <div className="d-f ai-c g-4">
      {verifiedMembers.map((member) => (
        <Avatar
          key={member.avatarUrl}
          src={member.avatarUrl}
          name={member.name}
          verified
        />
      ))}
    </div>
  );
}

const verifiedMembers = [
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
];
