import { Avatar } from "@base-ui/react/avatar";

export default function AvatarIndicator() {
  return (
    <div className="p-r d-10">
      <Avatar.Root className="d-if d-10 ai-c jc-c br-pill o-h bg-silver-2">
        <Avatar.Image
          src="/img/people/rayhan-zua.jpg"
          alt="Rayhan Zua"
          className="w-full h-full of-c"
        />
        <Avatar.Fallback className="d-f ai-c jc-c w-full h-full fs-md fw-600 c-slate-8">
          RZ
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="p-a r-0 b-0 d-3 br-pill bg-green bw-2 bc-white" />
    </div>
  );
}
