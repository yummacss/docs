import { Avatar } from "@base-ui/react/avatar";

export default function AvatarBase() {
  return (
    <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 bc-silver-3 br-pill bw-1 va-m us-none">
      <Avatar.Image
        src={userProfile.avatarUrl}
        alt={userProfile.name}
        className="of-c w-full h-full"
      />
      <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
        {userProfile.initials}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}

const userProfile = {
  name: "Sarah",
  initials: "S",
  avatarUrl: "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sarah",
};
