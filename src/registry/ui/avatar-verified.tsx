import { Avatar } from "@base-ui/react/avatar";
import { SealCheckIcon } from "@phosphor-icons/react";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      <div className="p-r">
        <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=45"
            alt="Emma Wilson"
            className="d-full of-c"
          />
          <Avatar.Fallback className="d-f ai-c jc-c d-full fs-md fw-500 c-slate-9">
            EW
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="p-a b-0 d-5 r-0 br-pill d-f ai-c jc-c bw-2 bc-white bg-white">
          <SealCheckIcon weight="fill" className="c-indigo" />
        </span>
      </div>

      <div className="p-r">
        <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-silver-1 us-none va-m">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=18"
            alt="James Brown"
            className="d-full of-c"
          />
          <Avatar.Fallback className="d-f ai-c jc-c d-full fs-md fw-500 c-slate-9">
            JB
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="p-a b-0 d-5 r-0 br-pill d-f ai-c jc-c bw-2 bc-white bg-white">
          <SealCheckIcon weight="fill" className="c-indigo" />
        </span>
      </div>
    </div>
  );
}
