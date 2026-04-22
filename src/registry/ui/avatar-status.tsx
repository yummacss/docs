import { Avatar } from "@base-ui/react/avatar";

export default function AvatarStatus() {
  return (
    <div className="d-f ai-c g-4">
      {statusMembers.map((member) => (
        <div key={member.name} className="p-r">
          <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 bc-silver-3 br-pill bw-1 va-m us-none">
            <Avatar.Image
              src={member.avatarUrl}
              alt={member.name}
              className="of-c w-full h-full"
            />
          </Avatar.Root>
          <span
            className={`p-a b-0 r-0 w-4 h-4 bc-white br-pill bw-2 ${member.statusColor}`}
          />
        </div>
      ))}
    </div>
  );
}

const statusMembers = [
  {
    name: "Sarah",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=Sarah",
    statusColor: "bg-green-6",
  },
  {
    name: "Avery",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=Avery",
    statusColor: "bg-slate-4",
  },
  {
    name: "Jude",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=Jude",
    statusColor: "bg-red-6",
  },
];
