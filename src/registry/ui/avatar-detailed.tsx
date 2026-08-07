import Avatar from "./avatar";

export default function AvatarDetailed() {
  return (
    <div className="d-f fd-c g-4">
      {teamMembers.map((member) => (
        <div key={member.avatarUrl} className="d-f ai-c g-3">
          <Avatar src={member.avatarUrl} name={member.name} />
          <div>
            <p className="m-0 c-slate-10 fs-sm fw-500">{member.name}</p>
            <p className="m-0 c-slate-7 fs-xs">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const teamMembers = [
  {
    name: "Adrian",
    role: "@adrian",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    name: "Aidan",
    role: "@aidan",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aidan&backgroundColor=FFD4DE",
  },
  {
    name: "Jade",
    role: "@jade",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jade&backgroundColor=DAF0B9",
  },
];
