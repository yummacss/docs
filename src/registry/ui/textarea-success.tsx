import { Field } from "@base-ui/react/field";
import { Check } from "iconoir-react";

export default function TextareaSuccess() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Task notes</Field.Label>
      <div className="d-f p-r ai-s">
        <Field.Control
          render={<textarea />}
          placeholder="Add notes about this task..."
          aria-label="Add notes about this task"
          defaultValue="This task is blocked by the API integration. Waiting for backend to complete the endpoint."
          className="h-24 w-64 pt-3 pl-3 pr-10 bg-white bc-green-5 c-slate-10 bw-1 br-md fs-md bs-o-xs r-none fv:oo--1 fv:oc-green-5"
        />
        <div className="d-f p-a r-3 t-3 ai-c jc-c c-green-5">
          <Check className="w-4 h-4" />
        </div>
      </div>
      <Field.Description className="c-green-6 fs-xs">
        Notes look good!
      </Field.Description>
    </Field.Root>
  );
}
