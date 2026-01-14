import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatarLabel() {
  return (
    <div className="d-f ai-c g-3">
      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-silver-1 us-none">
        <Avatar.Image
          src="/img/people/rayhan-zua.jpg"
          alt="Rayhan Zua"
          className="d-full of-c"
        />
        <Avatar.Fallback className="d-f ai-c jc-c d-full fs-md fw-500 c-slate">
          RZ
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="fs-sm fw-500 c-slate">@rayhanzua</div>
    </div>
  );
}
