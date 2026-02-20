import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
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
  );
}
