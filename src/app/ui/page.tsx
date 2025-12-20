import Silk from "@/components/silk";
import Navbar from "@/components/ui/navbar";
import { BookIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { SiHtml5, SiNextdotjs, SiReact } from "react-icons/si";

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
        className="~sm-xxl w-full mx-auto px-6 d-f ai-fe pb-12 p-r zi-1"
        style={{
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <div className="w-full" style={{ maxWidth: "72rem" }}>
          <div className="d-g lg:gtc-2 g-12 ai-fe">
            <div>
              <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/" target="_blank" className="tc-white">
                <div className="d-if ai-c g-2 px-4 py-2 bf-b-md b-1 bg-white/5 bc-white/10 rad-9 mb-8">
                  <span className="w-3 h-3 rad-9">
                    <SealCheckIcon className="w-3 h-3" weight="fill" />
                  </span>
                  <span className="fs-xs fw-500 ls-4">
                    We now use APG patterns!
                  </span>
                </div>
              </Link>
              <h1 className="fs-5xl md:fs-6xl fw-400 mb-6 lh-1">
                Build clean, production-ready interfaces faster.
              </h1>
              <p className="fs-lg tc-white/70 mb-8 lh-5">
                Production-ready components for landing pages, dashboards and
                SaaS apps that are fully customizable and framework-friendly.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/ui/introduction"
                  className="bg-white px-6 py-3 tc-black fs-md fw-600 rad-9"
                >
                  Explore UI
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 fw-600 tc-white fs-md d-f ai-c g-2"
                >
                  <BookIcon size={20} weight="duotone" />
                  Documentation
                </Link>
              </div>

              <div className="d-f fw-w g-3 bt-1 bc-white/10 pt-6">
                <span className="fs-sm tc-white/60">Works with:</span>
                <div className="d-f ai-c g-4">
                  <div className="d-f ai-c g-2 tc-white/80">
                    <SiHtml5 size={20} />
                    <span className="fs-sm fw-500">HTML</span>
                  </div>
                  <div className="d-f ai-c g-2 tc-white/80">
                    <SiReact size={20} />
                    <span className="fs-sm fw-500">React</span>
                  </div>
                  <div className="d-f ai-c g-2 tc-white/80">
                    <SiNextdotjs size={20} />
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
