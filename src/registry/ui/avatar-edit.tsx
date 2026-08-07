import { Button } from "@base-ui/react/button";
import { EditPencil } from "iconoir-react";
import Avatar from "./avatar";

export default function AvatarEdit() {
  return (
    <Avatar
      src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
      name="John"
    >
      <Button
        className="d-f p-a b-0 r-0 ai-c jc-c w-5 h-5 p-0 bg-white bc-silver-3 br-9999 bw-1 c-p us-none fv:oo-1 fv:oc-indigo-5"
        aria-label="Edit profile picture"
      >
        <EditPencil className="fs-0 w-3 h-3 c-slate-6" />
      </Button>
    </Avatar>
  );
}
