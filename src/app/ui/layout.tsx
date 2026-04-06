import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import TableOfContents from "@/components/ui/toc";
import UISidebar from "@/components/ui/ui-sidebar";

const description = "Beautiful UI components built with Yumma CSS.";

export const metadata: Metadata = {
  title: {
    default: "Yumma UI - Beautiful UI components built with Yumma CSS.",
    template: "%s · Yumma UI",
  },
  description,
  metadataBase: new URL("https://yummacss.com"),
  openGraph: {
    images: "/ui-og.png",
  },
};

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Navbar showMobileSidebar />

      <main
        className="mx-auto px-6"
        style={{ maxWidth: "clamp(40rem, 80vw, 96rem)" }}
      >
        <div className="d-g gtc-1 g-8 lg:gtc-12">
          <UISidebar />

          <div className="pt-12 lg:gc-s-6">
            <article className="max-w-none">{children}</article>
          </div>

          <TableOfContents />
        </div>
      </main>
    </div>
  );
}
