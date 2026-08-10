import { ComponentSolid } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

const title = "Yumma CSS - Utility CSS that maps 1:1 to CSS properties";
const description =
  "Every Yumma CSS class is one CSS property and one value from a fixed scale. There is an abbreviation table to learn - and what you learn is CSS.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
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
                One class. One CSS property.
              </h1>
              <p className="mb-6 c-white/70 fs-md lh-5 @md:fs-lg">
                <code className="c-code">d-f</code> is{" "}
                <code className="c-code">display: flex</code>.{" "}
                <code className="c-code">jc-sb</code> is{" "}
                <code className="c-code">justify-content: space-between</code>.
                Initials of the property, initials of the value, drawn from a
                fixed scale.
              </p>
              <p className="mb-8 c-white/70 fs-md lh-5 @md:fs-lg">
                There is an abbreviation table to learn. What you learn is CSS
                &mdash; so it still works the day you write a stylesheet by
                hand.
              </p>

              <div className="d-f fw-w g-4 mb-12">
                <a
                  href="https://play.yummacss.com"
                  className="px-6 py-3 bg-white c-black fs-md fw-600 us-none"
                >
                  Try it in the browser
                </a>
                <Link
                  href="/docs/why-yumma-css"
                  className="px-6 py-3 c-white fw-600 fs-md us-none fv:oc-white fv:ow-2"
                >
                  Why Yumma CSS?
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

            {/*
             * The playground, not the install page, is the primary call to
             * action: nobody adds a build-time dependency to find out what a
             * framework's class names look like. `loading="lazy"` keeps the
             * embed off the critical path, since it boots Monaco.
             */}
            <div className="o-h w-100% bw-1 bc-border bg-surface">
              <iframe
                src="https://play.yummacss.com/embed"
                title="Yumma CSS playground"
                loading="lazy"
                className="d-b w-100% bw-0"
                style={{ height: "clamp(24rem, 60vh, 34rem)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
