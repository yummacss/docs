import { Avatar } from "@base-ui/react/avatar";

export default function AvatarInitials() {
  return (
    <Avatar.Root className="d-if d-10 ai-c jc-c br-pill o-h bg-blue-1">
      <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-600 c-blue-8">
        RZ
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
