import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { ArrowSeparateVertical } from "iconoir-react";

export default function SelectDisabled() {
  return (
    <Field.Root className="d-f fd-c g-2 o-50 c-na">
      <label
        htmlFor="select-status-disabled"
        className="c-slate-10 fs-sm fw-500 us-none"
      >
        Task Status
      </label>
      <Select.Root defaultValue={"in-progress"} disabled>
        <Select.Trigger
          id="select-status-disabled"
          className="d-f ai-c jc-sb h-10 w-64 bw-1 bc-silver-3 br-lg bg-white px-3 c-slate-4 us-none bs-o-xs"
        >
          <Select.Value>
            <span className="min-w-0 o-h to-e ws-nw">
              {statuses.find((s) => s.value === "in-progress")?.label}
            </span>
          </Select.Value>
          <Select.Icon className="d-f c-slate-6">
            <ArrowSeparateVertical className="w-4 h-4" />
          </Select.Icon>
        </Select.Trigger>
      </Select.Root>
    </Field.Root>
  );
}

const statuses = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
  { label: "Blocked", value: "blocked" },
];
