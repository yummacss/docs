import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c">
      <Avatar.Root className="d-if w-14 h-14 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m bw-2 bc-white">
        <Avatar.Image
          src="https://i.pravatar.cc/64?img=12"
          alt="Marcus Webb"
          className="w-full h-full of-c"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-500 c-slate-9">
          MW
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if w-14 h-14 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m ml--2 bw-2 bc-white">
        <Avatar.Image
          src="https://i.pravatar.cc/64?img=25"
          alt="Sarah Chen"
          className="w-full h-full of-c"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-500 c-slate-9">
          SC
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if w-14 h-14 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m ml--2 bw-2 bc-white">
        <Avatar.Image
          src="https://i.pravatar.cc/64?img=33"
          alt="Alex Kim"
          className="w-full h-full of-c"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-500 c-slate-9">
          AK
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if w-14 h-14 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m ml--2 bw-2 bc-white">
        <Avatar.Image
          src="https://i.pravatar.cc/64?img=45"
          alt="Emma Wilson"
          className="w-full h-full of-c"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-500 c-slate-9">
          EW
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if w-14 h-14 ai-c jc-c br-pill o-h bg-indigo-1 us-none va-m ml--2 bw-2 bc-white">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-sm fw-600 c-indigo">
          +3
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
