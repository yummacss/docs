"use client";

import Link from "next/link";
import { SiHtml5, SiNextdotjs, SiReact } from "react-icons/si";
import UINavbar from "@/components/ui/UINavbar";

export default function UIPage() {
  return (
    <div className="min-h-dvh bg-white tc-slate-10 p-r o-h">
      <div className="p-r zi-1">
        <UINavbar />
      </div>

      <div
        className="~sm-xxl w-full mx-auto px-6 d-f ai-c p-r zi-1"
        style={{
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <div className="w-full" style={{ maxWidth: "72rem" }}>
          <div className="d-g lg:gtc-2 g-12 ai-c">
            <div>
              <h1 className="fs-5xl md:fs-6xl fw-400 mb-6 lh-1">
                Beautiful UI components built with Yumma CSS.
              </h1>
              <p className="fs-lg tc-silver-10 mb-8 lh-5">
                Browse our collection of over a hundred free, modern, and
                beautiful UI components, each designed purely with Yumma CSS.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/ui/introduction"
                  className="bg-slate-8 px-6 py-3 tc-white fs-md fw-600 rad-9 h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2"
                >
                  Get started
                </Link>
                <Link
                  href="/ui/templates"
                  className="ai-c d-f jc-c g-2 px-3 py-2 rad-9 fs-md fw-600 bg-white tc-slate-8 h:bg-silver-1 f:oc-silver-1 f:os-s f:ow-2"
                >
                  Buy templates
                </Link>
              </div>

              <div className="d-f ai-c g-3">
                <span className="fs-sm tc-silver-8">Works with:</span>
                <div className="d-f ai-c g-4">
                  <div className="d-f ai-c g-2 tc-silver-10">
                    <SiHtml5 className="w-5 h-5" />
                    <span className="fs-sm fw-500">HTML</span>
                  </div>
                  <div className="d-f ai-c g-2 tc-silver-10">
                    <SiReact className="w-5 h-5" />
                    <span className="fs-sm fw-500">React</span>
                  </div>
                  <div className="d-f ai-c g-2 tc-silver-10">
                    <SiNextdotjs className="w-5 h-5" />
                    <span className="fs-sm fw-500">Next.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
