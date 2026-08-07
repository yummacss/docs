import Avatar from "./avatar";

export default function AvatarSquircle() {
  return <Avatar src={userProfile.avatarUrl} name={userProfile.name} shape="squircle" />;
}

const userProfile = {
  name: "John",
  avatarUrl:
    "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
};
