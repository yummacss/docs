import { Button } from "@base-ui/react/button";
import { EditPencil } from "iconoir-react";
import Avatar from "./avatar";
import Dialog from "./dialog";
import Field from "./field";

export default function DialogEditProfile({
  container,
}: {
  /** Portal target, so a popup opened in a framed preview stays in the frame. */
  container?: HTMLElement | null;
}) {
  return (
    <Dialog container={container}
      trigger="Edit profile"
      title="Edit profile"
      confirmLabel="Save changes"
    >
      <div className="d-f fd-c g-5">
        <div className="d-f ai-c g-4">
          <Avatar
            size="lg"
            src="https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9"
            name="John"
          >
            <Button className="d-f p-a b-0 r-0 ai-c jc-c w-5 h-5 p-0 bg-white bc-silver-3 br-9999 bw-1 us-none fv:oo-1 fv:oc-indigo-5">
              <EditPencil className="fs-0 w-3 h-3 c-slate-6" />
            </Button>
          </Avatar>
          <div className="d-f fd-c">
            <span className="c-slate-10 fs-lg fw-500">John</span>
            <span className="c-slate-6 fs-sm">@john</span>
          </div>
        </div>
        <div className="d-g g-3 @sm:gtc-2">
          <Field fullWidth label="First name" defaultValue="John" />
          <Field fullWidth label="Last name" />
        </div>
        <Field fullWidth label="Username" defaultValue="john" />
        <Field
          fullWidth
          label="Email"
          defaultValue="john"
          suffix="@yummaui.com"
        />
        <Field
          multiline
          label="Bio"
          defaultValue="Lead developer working on the Sales Site and Dashboard projects."
        />
      </div>
    </Dialog>
  );
}
