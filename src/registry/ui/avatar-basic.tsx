import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f g-5">
      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-silver-1 us-none">
        <Avatar.Image
          src="https://untitledui.com/images/avatars/jordan-burgess"
          alt="Jordan Burgess"
          className="d-full of-c"
        />
        <Avatar.Fallback className="d-f ai-c jc-c d-full fs-md fw-500 c-slate">
          JB
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-silver-1 us-none">
        JB
      </Avatar.Root>
    </div>
  );
}
