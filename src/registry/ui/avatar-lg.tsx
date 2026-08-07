import Avatar from "./avatar";

export default function AvatarLg() {
  return (
    <div className="d-f ai-c g-4">
      <Avatar
        size="lg"
        src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
        name="John"
        status="online"
      />
      <Avatar
        size="lg"
        src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=B4E9F2"
        name="John"
        verified
      />
      <Avatar size="lg" tint="indigo" />
      <Avatar size="lg" fallback="ME" tint="indigo" />
    </div>
  );
}
