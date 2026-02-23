import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f fd-c g-4">
      <div className="d-f ai-c g-3">
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
        <div>
          <p className="m-0 c-slate-10 fs-sm fw-600">Marcus Webb</p>
          <p className="m-0 c-slate-7 fs-xs">Product Designer</p>
        </div>
      </div>

      <div className="d-f ai-c g-3">
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
        <div>
          <p className="m-0 c-slate-10 fs-sm fw-600">Sarah Chen</p>
          <p className="m-0 c-slate-7 fs-xs">Software Engineer</p>
        </div>
      </div>

      <div className="d-f ai-c g-3">
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
        <div>
          <p className="m-0 c-slate-10 fs-sm fw-600">Alex Kim</p>
          <p className="m-0 c-slate-7 fs-xs">Marketing Manager</p>
        </div>
      </div>
    </div>
  );
}
