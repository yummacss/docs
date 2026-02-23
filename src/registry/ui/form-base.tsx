"use client";

import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import * as React from "react";

export default function ExampleForm() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  return (
    <Form
      className="d-f fd-c g-4 w-full max-w-64"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;

        setLoading(true);
        setSuccess(false);
        const response = await checkUsername(username);

        if (response.error) {
          setErrors({ username: response.error });
        } else {
          setErrors({});
          setSuccess(true);
        }
        setLoading(false);
      }}
    >
      <Field.Root name="username" className="d-f fd-c ai-fs g-2">
        <Field.Label className="c-slate-10 fs-sm fw-600">
          Username <span className="c-indigo">*</span>
        </Field.Label>
        <Field.Control
          required
          placeholder="Enter username"
          pattern="[a-z0-9_]+"
          className="h-10 w-full pl-4 bg-white bc-silver-3 c-slate-10 bw-1 br-2 fs-sm fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
        />
        <Field.Error className="c-red fs-sm" />
        {success && (
          <span className="c-green fs-sm">Username is available!</span>
        )}
      </Field.Root>
      <button
        disabled={loading}
        type="submit"
        className="b-0 px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-2 bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 d:o-50 d:c-not-allowed"
      >
        {loading ? "Checking..." : "Check availability"}
      </button>
    </Form>
  );
}

async function checkUsername(username: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  const taken = ["admin", "root", "user", "test"];
  if (taken.includes(username.toLowerCase())) {
    return { error: "This username is already taken" };
  }

  if (username.length < 3) {
    return { error: "Username must be at least 3 characters" };
  }

  return { success: true };
}
