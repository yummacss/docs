import {
  FeatherIcon,
  LightningIcon,
  SealCheckIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import DarkVeil from "@/components/dark-veil";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="p-r min-h-dvh bg-black c-white">
      <div className="p-a t-0 l-0 zi-0 w-full h-full">
        <DarkVeil />
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
                href="https://play.yummacss.com"
                className="d-if ai-c g-2 px-4 py-2 mb-8 bc-white/10 bg-white/5 c-white bw-1 br-pill bf-b-md fv:oc-white fv:ow-2"
              >
                <span className="fs-xs fw-500 ls-4">
                  Try Yumma CSS in your browser
                </span>
              </Link>

              <h1 className="mb-6 fs-5xl fw-400 lh-2 ff-e md:fs-6xl">
                Type less. Style more.
              </h1>
              <p className="c-white/70 mb-8 fs-lg lh-5">
                Atomic CSS with abbreviated utility classes. d-f not flex, fw-600 not font-bold, o-auto not overflow-auto.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <Link
                  href="/docs/installation"
                  className="px-6 py-3 bg-white c-black br-pill fs-md fw-600 us-none"
                >
                  Get started
                </Link>
                <Link
                  href="/ui/components"
                  className="d-f ai-c g-2 px-6 py-3 c-white br-pill fw-600 fs-md us-none fv:oc-white fv:ow-2"
                >
                  <SparkleIcon size={20} weight="duotone" />
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
