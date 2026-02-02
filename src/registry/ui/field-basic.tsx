import { Field } from "@base-ui/react/field";

export default function ExampleField() {
  return (
    <Field.Root className="d-f fd-c ai-fs g-2 w-full max-w-64">
      <Field.Label className="fs-sm fw-600 c-slate-10">
        Email <span className="c-indigo">*</span>
      </Field.Label>
      <Field.Control
        required
        type="email"
        placeholder="you@example.com"
        className="h-10 w-full bw-1 bc-silver-3 br-2 bg-white pl-4 fs-sm c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
      />
      <Field.Error className="fs-sm c-red" match="valueMissing">
        Please enter your email address
      </Field.Error>
      <Field.Error className="fs-sm c-red" match="typeMismatch">
        Please enter a valid email address
      </Field.Error>
      <Field.Description className="fs-sm c-slate-8">
        Never shared publicly.
      </Field.Description>
    </Field.Root>
  );
}
