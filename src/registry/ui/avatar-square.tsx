import Avatar from "./avatar";

export default function AvatarSquare() {
  return <Avatar src={userProfile.avatarUrl} name={userProfile.name} shape="square" />;
}

const userProfile = {
  name: "John",
  avatarUrl:
    "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
};
