import Avatar from "./avatar";

export default function AvatarMd() {
  return (
    <div className="d-f ai-c g-4">
      <Avatar
        src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
        name="John"
        status="online"
      />
      <Avatar
        src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=B4E9F2"
        name="John"
        verified
      />
      <Avatar tint="indigo" />
      <Avatar fallback="ME" tint="indigo" />
    </div>
  );
}
