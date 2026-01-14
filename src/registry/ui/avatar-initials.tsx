import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatarInitials() {
  return (
    <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-blue-1 us-none">
      <Avatar.Fallback className="d-f ai-c jc-c d-full fs-md fw-500 c-blue-8">
        RZ
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
