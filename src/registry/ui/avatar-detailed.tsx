import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f fd-c g-4">
      <div className="d-f ai-c g-3">
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
        <div>
          <p className="m-0 fs-sm fw-600 c-slate-10">Marcus Webb</p>
          <p className="m-0 fs-xs c-slate-7">Product Designer</p>
        </div>
      </div>

      <div className="d-f ai-c g-3">
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
        <div>
          <p className="m-0 fs-sm fw-600 c-slate-10">Sarah Chen</p>
          <p className="m-0 fs-xs c-slate-7">Software Engineer</p>
        </div>
      </div>

      <div className="d-f ai-c g-3">
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
        <div>
          <p className="m-0 fs-sm fw-600 c-slate-10">Alex Kim</p>
          <p className="m-0 fs-xs c-slate-7">Marketing Manager</p>
        </div>
      </div>
    </div>
  );
}
