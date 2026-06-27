import { ComponentSolid } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

const tagline = "If you know CSS, you already know Yumma CSS.";
const description =
  "Yumma CSS is a utility framework whose class names are derived from CSS property names by one rule. No invented vocabulary, no lookup tables: just CSS, compressed.";

export const metadata: Metadata = {
  title: `Yumma CSS - Utility CSS with no new vocabulary`,
  description,
  openGraph: {
    title: `Yumma CSS - Utility CSS with no new vocabulary`,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yumma CSS - Utility CSS with no new vocabulary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yumma CSS - Utility CSS with no new vocabulary`,
    description,
    images: ["/og.png"],
  },
};

export default function Home() {
  return (
    <div className="p-r min-h-dvh c-white">
      <Navbar variant="transparent" />

      <div
        className="d-f p-r ai-fe w-100% mx-auto px-6 pb-16 @md:pb-0"
        style={{
          minHeight: "calc(100dvh - 120px)",
          maxWidth: "clamp(40rem, 80vw, 96rem)",
        }}
      >
        <div className="w-100% max-w-288">
          <div className="d-g g-12 ai-fe @lg:gtc-2">
            <div>
              <h1 className="mb-6 fs-4xl fw-400 lh-2 ff-e @md:fs-5xl @lg:fs-6xl">
                Know CSS? You know Yumma CSS.
              </h1>
              <p className="mb-8 c-white/70 fs-md lh-5 @md:fs-lg">
                Class names derived from CSS property names by one rule. No
                invented vocabulary, no lookup tables: just CSS, compressed.
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
                  <ComponentSolid className="w-5 h-5" />
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
