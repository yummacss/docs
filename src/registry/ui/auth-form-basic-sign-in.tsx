"use client";

import { Button } from "@base-ui/react/button";
import { Checkbox } from "@base-ui/react/checkbox";
import { Field } from "@base-ui/react/field";
import { CheckIcon } from "@phosphor-icons/react";

export default function AuthFormBasicSignIn() {
  return (
    <div className="w-full max-w-96 bw-1 bc-silver-4 br-1 bs-xs p-8">
      <h2 className="fs-xxl fw-600 c-slate-9 mb-2">Welcome back</h2>
      <p className="fs-sm c-slate-6 mb-6">
        Enter your credentials to sign in to your account.
      </p>
      <form className="d-f fd-c g-4">
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
        <div className="d-f ai-c jc-sb">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: Base UI Checkbox.Root internally renders the input */}
          <label className="d-f ai-c g-2 fs-sm c-slate-6">
            <Checkbox.Root className="d-f d-4 ai-c jc-c br-1 fv:os-s fv:ow-2 fv:oo-2 fv:oc-blue-8 auth-checkbox">
              <Checkbox.Indicator className="d-f c-silver-1">
                <CheckIcon size={10} weight="bold" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Keep me logged in
          </label>
          <a href="/" className="fs-sm c-slate-6 h:c-slate">
            Forgot password?
          </a>
        </div>
        <Button className="d-f h-10 ai-c jc-c w-full bw-1 bc-silver-4 br-1 bg-silver-1 px-4 fs-sm fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8">
          Sign in
        </Button>
      </form>
      <p className="fs-sm c-slate-6 ta-c mt-6">
        Don't have an account?{" "}
        <a href="/" className="fw-600 c-slate">
          Sign up
        </a>
      </p>
      <style>{`
        .auth-checkbox[data-unchecked] {
          border: 1px solid var(--silver-4);
          background-color: transparent;
        }
        .auth-checkbox[data-checked] {
          background-color: var(--slate);
        }
      `}</style>
    </div>
  );
}
