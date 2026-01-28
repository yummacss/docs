"use client";

import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import * as React from "react";

export default function ExampleForm() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  return (
    <Form
      className="d-f fd-c g-4 w-full max-w-64"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const value = formData.get("url") as string;

        setLoading(true);
        const response = await submitForm(value);
        const serverErrors = {
          url: response.error || "",
        };

        setErrors(serverErrors);
        setLoading(false);
      }}
    >
      <Field.Root name="url" className="d-f fd-c ai-fs g-1">
        <Field.Label className="fs-sm fw-500 c-slate">Homepage</Field.Label>
        <Field.Control
          type="url"
          required
          defaultValue="https://example.com"
          placeholder="https://example.com"
          pattern="https?://.*"
          className="h-10 w-full bw-1 bc-silver-4 br-1 bg-white pl-4 fs-md c-slate-12 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8"
        />
        <Field.Error className="fs-sm c-red-8" />
      </Field.Root>
      <button
        disabled={loading}
        type="submit"
        className="d-f ai-c jc-c h-10 bw-1 bc-silver-4 br-1 bg-silver-1 px-4 m-0 fs-md fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
}

async function submitForm(value: string) {
  // Mimic a server response
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  try {
    const url = new URL(value);

    if (url.hostname.endsWith("example.com")) {
      return { error: "The example domain is not allowed" };
    }
  } catch {
    return { error: "This is not a valid URL" };
  }

  return { success: true };
}
