import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
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
  );
}
