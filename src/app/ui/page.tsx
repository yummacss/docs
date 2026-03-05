import {
  MagnifyingGlassIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { SiNextdotjs, SiReact } from "react-icons/si";
import Silk from "@/components/silk";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: {
    absolute: "Yumma UI - Beautiful UI components built with Yumma CSS.",
  },
};

export default function UIPage() {
  return (
    <div className="p-r o-h min-h-dvh bg-black c-white">
      <div className="p-a t-0 l-0 zi-0 w-full h-full">
        <Silk />
      </div>
      <div className="p-r zi-1">
        <Navbar variant="transparent" />
      </div>

      <div
        className="d-f p-r zi-1 ai-fe w-full mx-auto px-6"
        style={{
          minHeight: "calc(100vh - 120px)",
          maxWidth: "clamp(40rem, 80vw, 96rem)",
        }}
      >
        <div className="w-full" style={{ maxWidth: "72rem" }}>
          <div className="d-g g-12 ai-fe lg:gtc-2">
            <div>
              <Link
                href="/ui/templates/neutra"
                className="d-if ai-c g-2 px-4 py-2 mb-8 bc-white/10 bg-white/5 c-white bw-1 br-pill bf-b-md fv:oc-white fv:ow-2"
              >
                <span className="w-3 h-3 br-pill">
                  <SparkleIcon className="w-3 h-3" weight="fill" />
                </span>
                <span className="fs-xs fw-500 ls-4">
                  Neutra: Design Agency template
                </span>
              </Link>
              <h1 className="mb-6 fs-5xl fw-400 lh-2 ff-e md:fs-6xl">
                Ship more, build even less
              </h1>
              <p className="c-white/70 mb-8 fs-lg lh-5">
                Beautiful components, sections, and templates. Fully
                customizable and framework-agnostic.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/ui/components"
                  className="px-6 py-3 bg-white c-black br-pill fs-md fw-600 us-none"
                >
                  Explore UI
                </Link>
                <Link
                  href="/ui/templates"
                  className="d-f ai-c g-2 px-6 py-3 c-white br-pill fw-600 fs-md us-none fv:oc-white fv:ow-2"
                >
                  <MagnifyingGlassIcon size={20} />
                  Browse templates
                </Link>
              </div>

              <div className="d-f fw-w g-3 pt-6 bc-white/10 btw-1">
                <span className="c-white/60 fs-sm">Works with</span>
                <div className="d-f ai-c g-4">
                  <div className="d-f c-white/80 ai-c g-2 us-none">
                    <SiNextdotjs size={20} />
                    <span className="fs-sm fw-500">Next.js</span>
                  </div>
                  <span className="c-white/60 fs-sm">and</span>
                  <div className="d-f c-white/80 ai-c g-2 us-none">
                    <SiReact size={20} />
                    <span className="fs-sm fw-500">React</span>
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
