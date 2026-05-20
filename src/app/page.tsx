"use client";

import { DiamondsFourIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="p-r min-h-dvh c-white">
      <Navbar variant="transparent" />

      <div
        className="d-f p-r ai-fe w-100% mx-auto px-6"
        style={{
          minHeight: "calc(100dvh - 120px)",
          maxWidth: "clamp(40rem, 80vw, 96rem)",
        }}
      >
        <div className="w-100%" style={{ maxWidth: "72rem" }}>
          <div className="d-g g-12 ai-fe lg:gtc-2 h-4 sm:h-6">
            <div>
              <h1 className="mb-6 fs-5xl fw-400 lh-2 ff-e md:fs-6xl">
                Type less. Style more.
              </h1>
              <p className="mb-8 c-white/70 fs-lg lh-5">
                The ergonomic CSS framework with abbreviated utility classes.{" "}
                <span className="c-white fs-md">d</span> not{" "}
                <span className="c-white fs-md">display</span>,{" "}
                <span className="c-white fs-md">fw</span> not{" "}
                <span className="c-white fs-md">font-weight</span>,{" "}
                <span className="c-white fs-md">g</span> not{" "}
                <span className="c-white fs-md">gap</span>.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/docs/installation"
                  className="px-6 py-3 bg-white c-black fs-md fw-600 us-none"
                >
                  Get started
                </Link>
                <Link
                  href="/ui/installation"
                  className="d-f ai-c g-2 px-6 py-3 c-white fw-600 fs-md us-none fv:oc-white fv:ow-2"
                >
                  <DiamondsFourIcon className="w-5 h-5" />
                  Components
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
