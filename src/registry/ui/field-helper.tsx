import { Field } from "@base-ui/react/field";

export default function FieldHelper() {
  return (
    <Field.Root className="d-f fd-c g-2 c-slate-10 fs-sm">
      <Field.Label className="fw-500">
        Task ID <span className="c-red-5">*</span>
      </Field.Label>
      <Field.Control
        placeholder="TSK-000000"
        className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-lg fs-md bs-o-xs fv:oo--1 fv:oc-indigo-5"
      />
      <Field.Description className="c-slate-6 fs-xs">
        Format: TSK followed by 6 digits
      </Field.Description>
    </Field.Root>
  );
}
