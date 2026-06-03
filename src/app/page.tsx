import { ComponentSolid } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

const tagline = "Type less. Style more.";

export const metadata: Metadata = {
  title: `Yumma CSS - ${tagline}`,
  description:
    "Yumma CSS is an ergonomic CSS framework with abbreviated utility classes. Write d-f instead of flex, fw-600 instead of font-semibold. Faster styling, less typing.",
  openGraph: {
    title: `Yumma CSS - ${tagline}`,
    description:
      "Yumma CSS is an ergonomic CSS framework with abbreviated utility classes. Write d-f instead of flex, fw-600 instead of font-semibold. Faster styling, less typing.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: tagline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yumma CSS - ${tagline}`,
    description:
      "Yumma CSS is an ergonomic CSS framework with abbreviated utility classes. Write d-f instead of flex, fw-600 instead of font-semibold. Faster styling, less typing.",
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
        <div className="w-100%" style={{ maxWidth: "72rem" }}>
          <div className="d-g g-12 ai-fe @lg:gtc-2">
            <div>
              <h1 className="mb-6 fs-4xl fw-400 lh-2 ff-e @md:fs-5xl @lg:fs-6xl">
                Type less. Style more.
              </h1>
              <p className="mb-8 c-white/70 fs-md lh-5 @md:fs-lg">
                The ergonomic CSS framework with abbreviated utility classes.{" "}
                <span className="c-white fs-sm @md:fs-md">d</span> not{" "}
                <span className="c-white fs-sm @md:fs-md">display</span>,{" "}
                <span className="c-white fs-sm @md:fs-md">fw</span> not{" "}
                <span className="c-white fs-sm @md:fs-md">font-weight</span>,{" "}
                <span className="c-white fs-sm @md:fs-md">g</span> not{" "}
                <span className="c-white fs-sm @md:fs-md">gap</span>.
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
