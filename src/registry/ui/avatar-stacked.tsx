import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c">
      {stackMembers.map((member, index) => (
        <Avatar.Root
          key={member.name}
          className={`d-if o-h ai-c jc-c w-14 h-14 bg-silver-1 bc-white br-pill bw-2 va-m us-none ${index > 0 ? "ml--2" : ""}`}
        >
          <Avatar.Image
            src={member.avatarUrl}
            alt={member.name}
            className="of-c w-full h-full"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
            {member.initials}
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
      <Avatar.Root className="d-if o-h ai-c jc-c w-14 h-14 ml--2 bg-indigo-1 bc-white br-pill bw-2 va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo fs-sm fw-600">
          +{extraCount}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

const stackMembers = [
  {
    name: "Marcus Webb",
    initials: "MW",
    avatarUrl: "https://i.pravatar.cc/64?img=12",
  },
  {
    name: "Sarah Chen",
    initials: "SC",
    avatarUrl: "https://i.pravatar.cc/64?img=25",
  },
  {
    name: "Alex Kim",
    initials: "AK",
    avatarUrl: "https://i.pravatar.cc/64?img=33",
  },
  {
    name: "Emma Wilson",
    initials: "EW",
    avatarUrl: "https://i.pravatar.cc/64?img=45",
  },
];

const extraCount = 3;
