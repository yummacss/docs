import type { Metadata } from "next";
import { Suspense } from "react";
import Playground from "@/components/playground/playground";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Try Yumma UI components with real props, live, before installing anything.",
};

export default function PlaygroundPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-6">
        <h1 className="c-white fs-4xl fw-400">Playground</h1>
        <p className="mt-2 mb-0 c-white/70 fs-lg">
          Pick a component, change its props, and see the result. Only props
          that differ from their default show up in the code.
        </p>
      </div>

      <Suspense fallback={null}>
        <Playground />
      </Suspense>
    </div>
  );
}
