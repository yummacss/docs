import { Field } from "@base-ui/react/field";
import { Fieldset } from "@base-ui/react/fieldset";

export default function ExampleFieldset() {
  return (
    <Fieldset.Root className="d-f fd-c g-4 w-full max-w-64 bw-0 m-0 p-0">
      <Fieldset.Legend className="bbw-1 bc-silver-4 pb-3 fs-lg fw-500 c-slate-12">
        Billing details
      </Fieldset.Legend>

      <Field.Root className="d-f fd-c ai-fs g-1">
        <Field.Label className="fs-sm fw-500 c-slate-12">Company</Field.Label>
        <Field.Control
          placeholder="Enter company name"
          className="h-10 w-full br-1 bw-1 bc-silver-4 pl-4 fs-md c-slate-12 bg-white f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
        />
      </Field.Root>

      <Field.Root className="d-f fd-c ai-fs g-1">
        <Field.Label className="fs-sm fw-500 c-slate-12">Tax ID</Field.Label>
        <Field.Control
          placeholder="Enter fiscal number"
          className="h-10 w-full br-1 bw-1 bc-silver-4 pl-4 fs-md c-slate-12 bg-white f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
        />
      </Field.Root>
    </Fieldset.Root>
  );
}
