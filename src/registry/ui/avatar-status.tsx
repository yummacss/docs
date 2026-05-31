import { Avatar } from "@base-ui/react/avatar";

export default function AvatarStatus() {
  return (
    <div className="d-f ai-c g-4">
      {statusMembers.map((member) => (
        <div key={member.avatarUrl} className="p-r">
          <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 bc-white br-9999 bw-1 va-m us-none">
            <Avatar.Image
              src={member.avatarUrl}
              alt={member.name}
              className="of-c w-100% h-100%"
            />
          </Avatar.Root>
          <span
            className={`p-a b-0 r-0 w-4 h-4 bc-white br-9999 bw-2 ${member.statusColor}`}
          />
        </div>
      ))}
    </div>
  );
}

const statusMembers = [
  {
    name: "Adrian",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
    statusColor: "bg-green-6",
  },
  {
    name: "Aidan",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aidan&backgroundColor=FFD4DE",
    statusColor: "bg-slate-4",
  },
  {
    name: "Jade",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Jade&backgroundColor=DAF0B9",
    statusColor: "bg-red-6",
  },
];
