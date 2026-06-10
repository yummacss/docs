import { Avatar } from "@base-ui/react/avatar";

export default function AvatarStackCompact() {
  return (
    <div className="d-f ai-c p-px bg-white bc-silver-3 br-9999 bw-1">
      {stackMembers.map((member, index) => (
        <Avatar.Root
          key={member.avatarUrl}
          className={`d-if o-h ai-c jc-c w-10 h-10 bg-silver-1 bc-white br-9999 bw-1 va-m us-none ${index > 0 ? "ml--2" : ""}`}
        >
          <Avatar.Image
            src={member.avatarUrl}
            alt={member.name}
            className="of-c w-100% h-100%"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-9 fs-md fw-500">
            {member.name[0]}
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
      <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 br-9999 va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-slate-8 fs-md fw-400">
          +{extraCount}
        </Avatar.Fallback>
      </Avatar.Root>
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
