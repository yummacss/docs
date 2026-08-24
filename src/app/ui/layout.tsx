import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import UIShell from "@/components/ui/shell";

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
        <UIShell>{children}</UIShell>
      </main>
    </div>
  );
}
