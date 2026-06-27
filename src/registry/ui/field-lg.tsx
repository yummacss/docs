import { Field } from "@base-ui/react/field";

export default function FieldLg() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">Large</Field.Label>
      <Field.Control
        placeholder="Large input"
        className="h-12 w-64 pl-5 pr-5 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-lg bs-o-xs fv:oo--1 fv:oc-indigo-5"
      />
    </Field.Root>
  );
}
