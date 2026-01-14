import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f g-5">
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
      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-silver-1 us-none">
        RZ
      </Avatar.Root>
    </div>
  );
}
