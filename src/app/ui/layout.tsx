import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import TableOfContents from "@/components/ui/toc";
import UISidebar from "@/components/ui/ui-sidebar";

const description =
  "A collection of UI components styled with Yumma CSS and Base UI.";

export const metadata: Metadata = {
  title: {
    default: `Yumma UI - ${description}`,
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
            <article>{children}</article>
          </div>

          <TableOfContents />
        </div>
      </main>
    </div>
  );
}
