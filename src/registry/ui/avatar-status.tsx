import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      {/* Online status */}
      <div className="p-r">
        <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 br-pill va-m us-none">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=12"
            alt="Marcus Webb"
            className="of-c w-full h-full"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
            MW
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="p-a b-0 r-0 w-4 h-4 bg-green-6 bc-white br-pill bw-2" />
      </div>

      {/* Offline status */}
      <div className="p-r">
        <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 br-pill va-m us-none">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=25"
            alt="Sarah Chen"
            className="of-c w-full h-full"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
            SC
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="p-a b-0 r-0 w-4 h-4 bg-slate-4 bc-white br-pill bw-2" />
      </div>

      {/* Busy status */}
      <div className="p-r">
        <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 br-pill va-m us-none">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=33"
            alt="Alex Kim"
            className="of-c w-full h-full"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
            AK
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="p-a b-0 r-0 w-4 h-4 bg-red-6 bc-white br-pill bw-2" />
      </div>
    </div>
  );
}
