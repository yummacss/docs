import { Avatar } from "@base-ui/react/avatar";
import { CircleQuestionMark, UserRound } from "lucide-react";

export default function AvatarMd() {
  return (
    <div className="d-f ai-c g-4">
      <div className="p-r">
        <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bg-silver-1 bc-white br-9999 bw-1 va-m us-none">
          <Avatar.Image
            src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
            alt="Sarah"
            className="of-c w-100% h-100%"
          />
        </Avatar.Root>
        <span className="p-a b-0 r-0 w-3 h-3 bg-green-6 bc-white br-9999 bw-1" />
      </div>

      <div className="p-r">
        <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bg-silver-1 bc-white br-9999 bw-1 va-m us-none">
          <Avatar.Image
            src="https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2"
            alt="John"
            className="of-c w-100% h-100%"
          />
        </Avatar.Root>
        <span className="d-f p-a b-0 r-0 ai-c jc-c w-3 h-3 bg-white bc-white br-9999 bw-1">
          <CircleQuestionMark className="w-100% h-100% c-indigo" />
        </span>
      </div>

      <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bg-indigo-1 br-9999 va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-indigo">
          <UserRound className="w-5 h-5" />
        </Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root className="d-if o-h ai-c jc-c w-10 h-10 bg-indigo-1 bc-indigo-3 br-9999 bw-1 va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-100% h-100% c-indigo fs-sm fw-500">
          S
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
