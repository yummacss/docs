import { Avatar } from "@base-ui/react/avatar";

export default function AvatarStatus() {
  return (
    <div className="d-f ai-c g-4">
      {statusMembers.map((member) => (
        <div key={member.name} className="p-r">
          <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 br-pill va-m us-none">
            <Avatar.Image
              src={member.avatarUrl}
              alt={member.name}
              className="of-c w-full h-full"
            />
            <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
              {member.initials}
            </Avatar.Fallback>
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
    name: "Marcus Webb",
    initials: "MW",
    avatarUrl: "https://i.pravatar.cc/64?img=12",
    statusColor: "bg-green-6",
  },
  {
    name: "Sarah Chen",
    initials: "SC",
    avatarUrl: "https://i.pravatar.cc/64?img=25",
    statusColor: "bg-slate-4",
  },
  {
    name: "Alex Kim",
    initials: "AK",
    avatarUrl: "https://i.pravatar.cc/64?img=33",
    statusColor: "bg-red-6",
  },
];
