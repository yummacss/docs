import { Avatar } from "@base-ui/react/avatar";
import { CircleCheckFill } from "@gravity-ui/icons";

export default function AvatarVerified() {
  return (
    <div className="d-f ai-c g-4">
      {verifiedMembers.map((member) => (
        <div key={member.name} className="p-r">
          <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 bc-white br-9999 bw-1 va-m us-none">
            <Avatar.Image
              src={member.avatarUrl}
              alt={member.name}
              className="of-c w-100% h-100%"
            />
          </Avatar.Root>
          <span className="d-f p-a b-0 r-0 ai-c jc-c w-4 h-4 bg-white bc-white br-9999 bw-1">
            <CircleCheckFill className="c-indigo" />
          </span>
        </div>
      ))}
    </div>
  );
}

const verifiedMembers = [
  {
    name: "Sarah",
    avatarUrl:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
  },
  {
    name: "John",
    avatarUrl:
      "https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2",
  },
];
