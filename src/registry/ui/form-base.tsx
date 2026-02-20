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
        <Field.Label className="fs-sm fw-600 c-slate-10">
          Username <span className="c-indigo">*</span>
        </Field.Label>
        <Field.Control
          required
          placeholder="Enter username"
          pattern="[a-z0-9_]+"
          className="h-10 w-full bw-1 bc-silver-3 br-2 bg-white pl-4 fs-sm c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
        />
        <Field.Error className="fs-sm c-red" />
        {success && (
          <span className="fs-sm c-green">Username is available!</span>
        )}
      </Field.Root>
      <button
        disabled={loading}
        type="submit"
        className="bg-indigo c-white br-2 px-3 py-2 fw-600 bs-o-md bw-1 bc-indigo-7 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0 d:o-50 d:c-not-allowed"
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
