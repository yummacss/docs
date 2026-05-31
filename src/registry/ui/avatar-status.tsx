import { Avatar } from "@base-ui/react/avatar";

export default function AvatarStatus() {
  return (
    <div className="d-f ai-c g-4">
      {statusMembers.map((member) => (
        <div key={member.name} className="p-r">
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
    name: "John",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
    statusColor: "bg-green-6",
  },
  {
    name: "John",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=B4E9F2",
    statusColor: "bg-slate-4",
  },
  {
    name: "Noah",
    avatarUrl:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
    statusColor: "bg-red-6",
  },
];
