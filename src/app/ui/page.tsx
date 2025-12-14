import { BookOpen02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiHtml5, SiNextdotjs, SiReact } from "react-icons/si";
import Silk from "@/components/silk";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: {
    absolute: "Yumma UI - Beautiful UI components built with Yumma CSS.",
  },
};

export default function UIPage() {
  return (
    <div className="min-h-dvh bg-black tc-white p-r o-h">
      <div className="p-a t-0 l-0 w-full h-full zi-0">
        <Silk />
      </div>
      <div className="p-r zi-1">
        <Navbar variant="transparent" />
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
              <p className="fs-lg tc-white/70 mb-8 lh-5">
                Browse our collection of over a hundred free, modern, and
                beautiful UI components, each designed purely with Yumma CSS.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/ui/introduction"
                  className="bg-white px-6 py-3 tc-black fs-md fw-600 rad-9"
                >
                  Browse now
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 fw-600 tc-white fs-md d-f ai-c g-2"
                >
                  <HugeiconsIcon icon={BookOpen02Icon} className="w-5 h-5" />
                  Documentation
                </Link>
              </div>

              <div className="d-f ai-c g-3">
                <span className="fs-sm tc-white/60">Works with:</span>
                <div className="d-f ai-c g-4">
                  <div className="d-f ai-c g-2 tc-white/80">
                    <SiHtml5 className="w-5 h-5" />
                    <span className="fs-sm fw-500">HTML</span>
                  </div>
                  <div className="d-f ai-c g-2 tc-white/80">
                    <SiReact className="w-5 h-5" />
                    <span className="fs-sm fw-500">React</span>
                  </div>
                  <div className="d-f ai-c g-2 tc-white/80">
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
