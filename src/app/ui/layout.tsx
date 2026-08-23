import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import UIDocsShell from "@/components/ui/ui-docs-shell";

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
      <Navbar showMobileDrawer />

      <main className="zi-0 mx-auto px-6 docs-container">
        <div className="d-g gtc-1 g-8 @lg:gtc-12">
          <Sidebar variant="ui" />
          <UIDocsShell>{children}</UIDocsShell>
        </div>
      </main>
    </div>
  );
}
