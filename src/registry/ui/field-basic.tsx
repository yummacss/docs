import { Field } from "@base-ui/react/field";

export default function ExampleField() {
  return (
    <Field.Root className="d-f fd-c ai-fs g-1 w-full max-w-64">
      <Field.Label className="fs-sm fw-500 c-slate">Name</Field.Label>
      <Field.Control
        required
        placeholder="Required"
        className="h-10 w-full bw-1 bc-silver-4 br-1 bg-white pl-4 fs-md c-slate f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
      />
      <Field.Error className="fs-sm c-red-8" match="valueMissing">
        Please enter your name
      </Field.Error>
      <Field.Description className="fs-sm c-slate-6">
        Visible on your profile
      </Field.Description>
    </Field.Root>
  );
}
