import Dialog from "./dialog";
import Field from "./field";
import Select from "./select";

export default function DialogSendInvite({
  container,
}: {
  /** Portal target, so a popup opened in a framed preview stays in the frame. */
  container?: HTMLElement | null;
}) {
  return (
    <Dialog
      container={container}
      trigger="Send invite"
      title="Send invite"
      confirmLabel="Send invite"
    >
      <div className="d-f fd-c g-4">
        <Field
          fullWidth
          type="email"
          label="Email address"
          placeholder="colleague@company.com"
        />
        <Select
          container={container}
          fullWidth
          options={roles}
          label="Role"
          placeholder="Select role..."
          defaultValue="viewer"
        />
        <Field
          multiline
          label="Message (optional)"
          placeholder="Add a personal note to your invitation..."
        />
      </div>
    </Dialog>
  );
}

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];
