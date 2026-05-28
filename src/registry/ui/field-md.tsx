import { Field } from "@base-ui/react/field";

export default function FieldMd() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Medium</Field.Label>
      <Field.Control
        placeholder="Medium input"
        className="h-8 w-64 pl-3 pr-3 bg-white bc-silver-3 c-slate-10 bw-1 br-md fs-sm bs-o-xs fv:oo--1 fv:oc-indigo-5"
      />
    </Field.Root>
  );
}
