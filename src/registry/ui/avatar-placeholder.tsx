import { Avatar } from "@base-ui/react/avatar";
import { UserIcon } from "@phosphor-icons/react";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-indigo-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo">
          <UserIcon size={24} weight="bold" />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-green-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-green">
          <UserIcon size={24} weight="bold" />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-red-1 br-pill va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-red">
          <UserIcon size={24} weight="bold" />
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
