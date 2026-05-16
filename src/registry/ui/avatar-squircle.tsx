import { Avatar } from "@base-ui/react/avatar";

export default function AvatarSquircle() {
  return (
    <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 bc-white br-xxl cs-s bw-1 va-m us-none">
      <Avatar.Image
        src={userProfile.avatarUrl}
        alt={userProfile.name}
        className="of-c w-100% h-100%"
      />
    </Avatar.Root>
  );
}

const userProfile = {
  name: "Sarah",
  avatarUrl:
    "https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9",
};
