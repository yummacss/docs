import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";

export default function AuthFormBasicSignUp() {
  return (
    <div className="w-full max-w-96 bw-1 bc-silver-4 br-1 bs-xs p-8">
      <h2 className="fs-xxl fw-600 c-slate-9 mb-2">Create an account</h2>
      <p className="fs-sm c-slate-6 mb-6">
        Enter your credentials to sign up to your account.
      </p>
      <form className="d-f fd-c g-4">
        <Field.Root className="d-f fd-c g-1">
          <Field.Label className="fs-sm fw-600 c-slate-9">Name</Field.Label>
          <Field.Control
            type="text"
            placeholder="Your name"
            className="w-full bw-1 bc-silver-4 br-1 bg-white px-3 py-2 fs-sm c-slate-12 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8"
          />
        </Field.Root>
        <Field.Root className="d-f fd-c g-1">
          <Field.Label className="fs-sm fw-600 c-slate-9">Email</Field.Label>
          <Field.Control
            type="email"
            placeholder="you@example.com"
            className="w-full bw-1 bc-silver-4 br-1 bg-white px-3 py-2 fs-sm c-slate-12 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8"
          />
        </Field.Root>
        <Field.Root className="d-f fd-c g-1">
          <Field.Label className="fs-sm fw-600 c-slate-9">Password</Field.Label>
          <Field.Control
            type="password"
            placeholder="••••••••"
            className="w-full bw-1 bc-silver-4 br-1 bg-white px-3 py-2 fs-sm c-slate f:os-s f:ow-2 f:oo--1 f:oc-blue-8"
          />
        </Field.Root>
        <Button className="d-f h-10 ai-c jc-c w-full bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-sm fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
          Create account
        </Button>
      </form>
      <p className="fs-sm c-slate-6 ta-c mt-6">
        Already have an account?{" "}
        <a href="/" className="fw-600 c-slate">
          Sign in
        </a>
      </p>
    </div>
  );
}
