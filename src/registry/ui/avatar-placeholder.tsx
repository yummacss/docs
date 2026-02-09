import { Avatar } from "@base-ui/react/avatar";
import { UserIcon } from "@phosphor-icons/react";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c d-full c-indigo">
          <UserIcon size={24} weight="bold" />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-green-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c d-full c-green">
          <UserIcon size={24} weight="bold" />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-red-1 us-none va-m">
        <Avatar.Fallback className="d-f ai-c jc-c d-full c-red">
          <UserIcon size={24} weight="bold" />
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
