import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c">
      <Avatar.Root className="d-if o-h ai-c jc-c w-14 h-14 bg-silver-1 bc-white br-pill bw-2 va-m us-none">
        <Avatar.Image
          src="https://i.pravatar.cc/64?img=12"
          alt="Marcus Webb"
          className="of-c w-full h-full"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
          MW
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if o-h ai-c jc-c w-14 h-14 ml--2 bg-silver-1 bc-white br-pill bw-2 va-m us-none">
        <Avatar.Image
          src="https://i.pravatar.cc/64?img=25"
          alt="Sarah Chen"
          className="of-c w-full h-full"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
          SC
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if o-h ai-c jc-c w-14 h-14 ml--2 bg-silver-1 bc-white br-pill bw-2 va-m us-none">
        <Avatar.Image
          src="https://i.pravatar.cc/64?img=33"
          alt="Alex Kim"
          className="of-c w-full h-full"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
          AK
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if o-h ai-c jc-c w-14 h-14 ml--2 bg-silver-1 bc-white br-pill bw-2 va-m us-none">
        <Avatar.Image
          src="https://i.pravatar.cc/64?img=45"
          alt="Emma Wilson"
          className="of-c w-full h-full"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
          EW
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if o-h ai-c jc-c w-14 h-14 ml--2 bg-indigo-1 bc-white br-pill bw-2 va-m us-none">
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo fs-sm fw-600">
          +3
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
