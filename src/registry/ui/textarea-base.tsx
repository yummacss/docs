import { Field } from "@base-ui/react/field";

export default function TextareaBase() {
  return (
    <Field.Control
      render={<textarea />}
      placeholder="Write your message..."
      aria-label="Write your message"
      className="h-24 w-64 pt-3 pl-3 bg-white bc-silver-3 c-slate-10 br-md bw-1 fs-md bs-o-xs r-none fv:oo--1 fv:oc-indigo-5"
    />
  );
}
