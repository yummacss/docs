import { Field } from "@base-ui/react/field";

export default function FieldSquare() {
  return (
    <Field.Control
      placeholder="Search projects..."
      aria-label="Search projects"
      className="h-10 w-64 pl-4 bg-white bc-silver-3 c-slate-10 bw-1 fs-md fv:oo--1 fv:oc-indigo-5"
    />
  );
}
