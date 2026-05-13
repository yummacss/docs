import { Avatar } from "@base-ui/react/avatar";
import { Button } from "@base-ui/react/button";
import { Pencil } from "@gravity-ui/icons";

export default function AvatarEdit() {
  return (
    <div className="d-f ai-c g-4">
      <div className="p-r">
        <Avatar.Root className="d-if o-h ai-c jc-c w-12 h-12 bg-silver-1 bc-white br-9999 bw-1 va-m us-none">
          <Avatar.Image
            src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
            alt="Sarah"
            className="of-c w-100% h-100%"
          />
        </Avatar.Root>
        <Button
          className="d-f p-a b-0 r-0 ai-c jc-c w-5 h-5 p-0 bg-white bc-silver-3 br-9999 bw-1 c-p us-none fv:ow-2 fv:oo-1 fv:oc-indigo-5"
          aria-label="Edit profile picture"
        >
          <Pencil className="fs-0 w-3 h-3 c-slate-6" />
        </Button>
      </div>
    </div>
  );
}
