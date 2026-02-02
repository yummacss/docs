import { Field } from "@base-ui/react/field";
import { Fieldset } from "@base-ui/react/fieldset";

export default function ExampleFieldset() {
  return (
    <Fieldset.Root className="d-f fd-c g-4 w-full max-w-64 bw-0 m-0 p-0">
      <Fieldset.Legend className="bbw-1 bc-silver-2 pb-3 fs-lg fw-600 c-slate-10">
        Contact info
      </Fieldset.Legend>

      <Field.Root className="d-f fd-c ai-fs g-2">
        <Field.Label className="fs-sm fw-600 c-slate-10">
          Full name <span className="c-indigo">*</span>
        </Field.Label>
        <Field.Control
          required
          placeholder="John Doe"
          className="h-10 w-full br-2 bw-1 bc-silver-3 pl-4 fs-sm c-slate-10 bg-white fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
        />
      </Field.Root>

      <Field.Root className="d-f fd-c ai-fs g-2">
        <Field.Label className="fs-sm fw-600 c-slate-10">
          Phone number
        </Field.Label>
        <Field.Control
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="h-10 w-full br-2 bw-1 bc-silver-3 pl-4 fs-sm c-slate-10 bg-white fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
        />
      </Field.Root>
    </Fieldset.Root>
  );
}
