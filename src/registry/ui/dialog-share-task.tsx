import Dialog from "./dialog";
import Field from "./field";
import Select from "./select";

export default function DialogShareTask() {
  return (
    <Dialog trigger="Share task" title="Share task" confirmLabel="Share">
      <div className="d-f fd-c g-4">
        <Field
          fullWidth
          label="Team member"
          placeholder="Search by name or email..."
        />
        <Select
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
