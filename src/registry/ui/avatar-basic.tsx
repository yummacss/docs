import { Avatar } from "@base-ui/react/avatar";

export default function ExampleAvatar() {
  return (
    <div className="d-f g-5">
      <Avatar.Root className="d-if d-12 ai-c jc-c br-pill o-h bg-silver-1 us-none">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
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
