import {
  GlobeIcon,
  LightningBoltIcon,
  MixIcon,
  StarFilledIcon,
  SwitchIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import DarkVeil from "@/components/dark-veil";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-vh tc-white p-r">
      <div className="p-a t-0 l-0 w-full h-full zi-0">
        <DarkVeil />
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
              <a
                href="https://github.com/yumma-lib/yumma-css"
                className="text-white"
              >
                <div className="d-if ai-c g-2 px-4 py-2 bf-b-md b-1 bg-white/5 bc-white/10 rad-9 mb-8">
                  <span className="w-3 h-3 rad-9">
                    <StarFilledIcon className="w-3 h-3" />
                  </span>
                  <span className="fs-xs fw-500 ls-4">Star us on GitHub</span>
                </div>
              </a>

              <h1 className="fs-5xl md:fs-6xl fw-400 mb-6 lh-1 tw-w">
                Style more, type even less
              </h1>
              <p className="fs-lg tc-white/70 mb-8 lh-5">
                A CLI-first CSS framework for the web with abbreviated and
                optimized styles for simple and scalable design systems.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/docs/installation"
                  className="bg-white px-6 py-3 tc-black fs-md fw-600 rad-9"
                >
                  Get started
                </Link>
                <Link
                  href="https://play.yummacss.com"
                  className="px-6 py-3 fw-600 tc-white fs-md d-f ai-c g-2"
                >
                  <MixIcon className="w-5 h-5" />
                  Playground
                </Link>
              </div>

              <div className="d-f fw-w g-3 bt-1 bc-white/10 pt-6">
                <div className="px-4 py-2 bg-white/10 bf-b-md rad-1 fs-xs d-f ai-c g-2 b-1 bc-white/5 tt-u">
                  <GlobeIcon className="w-4 h-4" />
                  Dedicated API
                </div>
                <div className="px-4 py-2 bg-white/10 bf-b-md rad-1 fs-xs d-f ai-c g-2 b-1 bc-white/5 tt-u">
                  <LightningBoltIcon className="w-4 h-4" />
                  CLI-First
                </div>
                <div className="px-4 py-2 bg-white/10 bf-b-sm rad-1 fs-xs d-f ai-c g-2 b-1 bc-white/5 tt-u">
                  <SwitchIcon className="w-4 h-4" />
                  UI Components
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
