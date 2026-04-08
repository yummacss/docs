"use client";

import type { ErrorInfo } from "next/error";

type Props = ErrorInfo & {
  unstable_retry?: () => void;
};

export default function ErrorPage({ error }: Props) {
  return (
    <div className="d-f fd-c ai-c jc-c min-h-dvh c-white ta-c">
      <div className="d-f fd-c ai-c">
        <div className="d-f ai-c mb-4">
          <h1 className="mr-5 pr-6 bc-white/20 brw-1 ff-e fs-4xl">500</h1>
          {error?.message && (
            <h2 className="m-0 fs-md fw-400">{error.message}</h2>
          )}
        </div>
      </div>
    </div>
  );
}
