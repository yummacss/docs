import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Plus } from "@gravity-ui/icons";

export default function AvatarStacked() {
  return (
    <div className="d-f ai-c">
      {stackMembers.map((member, index) => (
        <Avatar.Root
          key={member.name}
          className={`d-if o-h ai-c jc-c w-14 h-14 bg-silver-1 bc-silver-3 br-pill bw-1 va-m us-none ${index > 0 ? "ml--2" : ""}`}
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
      <Avatar.Root className="d-if o-h ai-c jc-c w-14 h-14 ml--2 bg-silver-1 bc-silver-3 br-pill bw-1 va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-8 fs-md fw-600">
          +{extraCount}
        </Avatar.Fallback>
      </Avatar.Root>
      <Button className="d-if ai-c jc-c w-14 h-14 ml-2 bg-transparent bs-d bc-silver-3 br-pill bw-1 c-slate-6 tp-c tdu-150 ttf-io us-none">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}

const stackMembers = [
  {
    name: "Sarah",
    initials: "S",
    avatarUrl: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sarah",
  },
  {
    name: "Avery",
    initials: "A",
    avatarUrl: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Avery",
  },
  {
    name: "Jude",
    initials: "J",
    avatarUrl: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jude",
  },
  {
    name: "Leo",
    initials: "L",
    avatarUrl: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Leo",
  },
];

const extraCount = 3;
