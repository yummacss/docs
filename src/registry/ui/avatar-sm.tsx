import Avatar from "./avatar";

export default function AvatarSm() {
  return (
    <div className="d-f ai-c g-4">
      <Avatar
        size="sm"
        src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
        name="John"
        status="online"
      />
      <Avatar
        size="sm"
        src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=B4E9F2"
        name="John"
        verified
      />
      <Avatar size="sm" tint="indigo" />
      <Avatar size="sm" fallback="ME" tint="indigo" />
    </div>
  );
}
