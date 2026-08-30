import Dialog from "./dialog";
import Field from "./field";
import Select from "./select";

export default function DialogShareTask({
  container,
}: {
  /** Portal target, so a popup opened in a framed preview stays in the frame. */
  container?: HTMLElement | null;
}) {
  return (
    <Dialog
      container={container}
      trigger="Share task"
      title="Share task"
      confirmLabel="Share"
    >
      <div className="d-f fd-c g-4">
        <Field
          fullWidth
          label="Team member"
          placeholder="Search by name or email..."
        />
        <Select
          container={container}
          fullWidth
          options={permissions}
          label="Permission level"
          placeholder="Select permission..."
          defaultValue="can-view"
        />
        <Field
          multiline
          label="Note (optional)"
          placeholder="Add a note about this task..."
        />
      </div>
    </Dialog>
  );
}

const permissions = [
  { label: "Can view", value: "can-view" },
  { label: "Can edit", value: "can-edit" },
  { label: "Can manage", value: "can-manage" },
];
