import Autocomplete from "./autocomplete";
import Dialog from "./dialog";
import Field from "./field";
import Select from "./select";

export default function DialogNewTask({
  container,
}: {
  /** Portal target, so a popup opened in a framed preview stays in the frame. */
  container?: HTMLElement | null;
}) {
  return (
    <Dialog
      container={container}
      trigger="New task"
      title="New task"
      confirmLabel="Create task"
    >
      <div className="d-f fd-c g-4">
        <Field
          fullWidth
          label="Title"
          placeholder="e.g. Redesign landing page"
        />
        <Field
          multiline
          label="Description"
          placeholder="Add details about this task..."
        />
        <Select
          container={container}
          fullWidth
          options={priorities}
          label="Priority"
          placeholder="Select priority..."
          defaultValue="medium"
        />
        <div className="d-g g-3 @sm:gtc-2">
          <Autocomplete
            container={container}
            fullWidth
            items={teamMembers}
            label="Assignee"
            placeholder="Name"
          />
          <Field fullWidth type="date" label="Due date" />
        </div>
      </div>
    </Dialog>
  );
}

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

const teamMembers = [
  {
    label: "John",
    description: "Product Designer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=John&backgroundColor=DAF0B9",
  },
  {
    label: "Melanie",
    description: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Melanie&backgroundColor=DCCEFC",
  },
  {
    label: "Noah",
    description: "Backend Developer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noah&backgroundColor=D0D1FB",
  },
  {
    label: "Riley",
    description: "Product Manager",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Riley&backgroundColor=F4C8FA",
  },
  {
    label: "Adrian",
    description: "QA Engineer",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Adrian&backgroundColor=FFD4DE",
  },
  {
    label: "Maria",
    description: "Engineering Lead",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Maria&backgroundColor=DCCEFC",
  },
];
