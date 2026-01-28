import { MagnifyingGlassIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr";
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
    <div className="min-h-dvh bg-black c-white p-r o-h">
      <div className="p-a t-0 l-0 w-full h-full zi-0">
        <Silk />
      </div>
      <div className="p-r zi-1">
        <Navbar variant="transparent" />
      </div>

      <div
        className="sm-xxl w-full mx-auto px-6 d-f ai-fe p-r zi-1"
        style={{
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <div className="w-full" style={{ maxWidth: "72rem" }}>
          <div className="d-g lg:gtc-2 g-12 ai-fe">
            <div>
              <Link href="/ui/templates/neutra" className="c-white">
                <div className="d-if ai-c g-2 px-4 py-2 bf-b-md bw-1 bg-white/5 bc-white/10 br-pill mb-8">
                  <span className="w-3 h-3 br-pill">
                    <SparkleIcon className="w-3 h-3" weight="fill" />
                  </span>
                  <span className="fs-xs fw-500 ls-4">
                    Neutra: Design Agency template
                  </span>
                </div>
              </Link>
              <h1 className="fs-5xl md:fs-6xl fw-400 mb-6 lh-2 ff-e">
                Ship more, build even less
              </h1>
              <p className="fs-lg c-white/70 mb-8 lh-5">
                Beautiful components, sections, and templates. Fully
                customizable and framework-agnostic.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/ui/components"
                  className="bg-white px-6 py-3 c-black fs-md fw-600 br-pill us-none"
                >
                  Explore UI
                </Link>
                <Link
                  href="/ui/templates"
                  className="px-6 py-3 fw-600 c-white fs-md d-f ai-c g-2 us-none"
                >
                  <MagnifyingGlassIcon size={20} />
                  Browse templates
                </Link>
              </div>

              <div className="d-f fw-w g-3 btw-1 bc-white/10 pt-6">
                <span className="fs-sm c-white/60">Works with</span>
                <div className="d-f ai-c g-4">
                  <div className="d-f ai-c g-2 c-white/80 us-none">
                    <SiNextdotjs size={20} />
                    <span className="fs-sm fw-500">Next.js</span>
                  </div>
                  <span className="fs-sm c-white/60">and</span>
                  <div className="d-f ai-c g-2 c-white/80 us-none">
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
