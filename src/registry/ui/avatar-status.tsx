import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      {/* Online status */}
      <div className="p-r">
        <Avatar.Root className="d-if w-12 h-12 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=12"
            alt="Marcus Webb"
            className="w-full h-full of-c"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-500 c-slate-9">
            MW
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="p-a b-0 r-0 w-4 h-4 br-pill bg-green-6 bw-2 bc-white" />
      </div>

      {/* Offline status */}
      <div className="p-r">
        <Avatar.Root className="d-if w-12 h-12 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=25"
            alt="Sarah Chen"
            className="w-full h-full of-c"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-500 c-slate-9">
            SC
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="p-a b-0 r-0 w-4 h-4 br-pill bg-slate-4 bw-2 bc-white" />
      </div>

      {/* Busy status */}
      <div className="p-r">
        <Avatar.Root className="d-if w-12 h-12 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=33"
            alt="Alex Kim"
            className="w-full h-full of-c"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-500 c-slate-9">
            AK
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="p-a b-0 r-0 w-4 h-4 br-pill bg-red-6 bw-2 bc-white" />
      </div>
    </div>
  );
}
