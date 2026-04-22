import { Avatar } from "@base-ui/react/avatar";

export default function AvatarDetailed() {
  return (
    <div className="d-f fd-c g-4">
      {teamMembers.map((member) => (
        <div key={member.name} className="d-f ai-c g-3">
          <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 bc-silver-3 br-pill bw-1 va-m us-none">
            <Avatar.Image
              src={member.avatarUrl}
              alt={member.name}
              className="of-c w-full h-full"
            />
            <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
              {member.initials}
            </Avatar.Fallback>
          </Avatar.Root>
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
    name: "Sarah",
    role: "@sarah",
    initials: "S",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=Sarah",
  },
  {
    name: "Avery",
    role: "@avery",
    initials: "A",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=Avery",
  },
  {
    name: "Jude",
    role: "@judet",
    initials: "J",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=Jude",
  },
];
