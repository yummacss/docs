import { Avatar } from "@base-ui/react/avatar";
import { CircleCheckFill } from "@gravity-ui/icons";

export default function ExampleAvatar() {
  return (
    <div className="d-f ai-c g-4">
      <div className="p-r">
        <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 br-pill va-m us-none">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=45"
            alt="Emma Wilson"
            className="of-c w-full h-full"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
            EW
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="d-f p-a b-0 r-0 ai-c jc-c w-5 h-5 bg-white bc-white br-pill bw-2">
          <CircleCheckFill className="c-indigo" />
        </span>
      </div>

      <div className="p-r">
        <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 br-pill va-m us-none">
          <Avatar.Image
            src="https://i.pravatar.cc/64?img=18"
            alt="James Brown"
            className="of-c w-full h-full"
          />
          <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-slate-9 fs-md fw-500">
            JB
          </Avatar.Fallback>
        </Avatar.Root>
        <span className="d-f p-a b-0 r-0 ai-c jc-c w-5 h-5 bg-white bc-white br-pill bw-2">
          <CircleCheckFill className="c-indigo" />
        </span>
      </div>
    </div>
  );
}
