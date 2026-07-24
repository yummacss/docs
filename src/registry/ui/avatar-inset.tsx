import { Avatar } from "@base-ui/react/avatar";

export default function AvatarInset() {
  return (
    <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 bc-white br-9999 bw-1 bs-i-sm va-m us-none">
      <Avatar.Image
        src={userProfile.avatarUrl}
        alt={userProfile.name}
        className="of-c w-100% h-100%"
      />
    </Avatar.Root>
  );
}

const userProfile = {
  name: "John",
  avatarUrl:
    "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
};
