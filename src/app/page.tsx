import {
  GlobeSimpleIcon,
  LightningIcon,
  SparkleIcon,
  StarIcon,
  TerminalIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import DarkVeil from "@/components/dark-veil";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="min-h-dvh bg-black c-white p-r">
      <div className="p-a t-0 l-0 w-full h-full zi-0">
        <DarkVeil />
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
              <Link
                href="https://github.com/yummacss/yummacss"
                className="c-white"
              >
                <div className="d-if ai-c g-2 px-4 py-2 bf-b-md bw-1 bg-white/5 bc-white/10 br-pill mb-8">
                  <span className="w-3 h-3 br-pill">
                    <StarIcon className="w-3 h-3" weight="fill" />
                  </span>
                  <span className="fs-xs fw-500 ls-4">Star us on GitHub</span>
                </div>
              </Link>

              <h1
                className="fs-5xl md:fs-6xl fw-400 mb-6 lh-2"
                style={{ fontFamily: "Esteban, serif" }}
              >
                Style more, type even less
              </h1>
              <p className="fs-lg c-white/70 mb-8 lh-5">
                A CLI-first CSS framework for the web with abbreviated and
                optimized styles for simple and scalable design systems.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/docs/installation"
                  className="bg-white px-6 py-3 c-black fs-md fw-600 br-pill us-none"
                >
                  Get started
                </Link>
                <Link
                  href="/ui"
                  className="px-6 py-3 fw-600 c-white fs-md d-f ai-c g-2 us-none"
                >
                  <SparkleIcon size={20} weight="duotone" />
                  Yumma UI
                </Link>
              </div>

              <div className="d-f fw-w g-3 btw-1 bc-white/10 pt-6">
                <div className="px-4 py-2 bg-white/10 bf-b-md fs-xs d-f ai-c g-2 bw-1 bc-white/5 tt-u us-none">
                  <GlobeSimpleIcon size={15} weight="duotone" />
                  Dedicated API
                </div>
                <div className="px-4 py-2 bg-white/10 bf-b-md fs-xs d-f ai-c g-2 bw-1 bc-white/5 tt-u us-none">
                  <TerminalIcon size={15} />
                  CLI-First
                </div>
                <div className="px-4 py-2 bg-white/10 bf-b-md fs-xs d-f ai-c g-2 bw-1 bc-white/5 tt-u us-none">
                  <LightningIcon size={15} weight="duotone" />
                  Blazing Fast
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
