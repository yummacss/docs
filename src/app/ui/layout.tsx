import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import { PlaygroundProvider } from "@/components/ui/playground-context";
import PropsPanel from "@/components/ui/props-panel";
import Sidebar from "@/components/ui/sidebar";

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

      <main className="zi-0 mx-auto px-6 ui-container">
        {/* A UI page is one component, so the right column carries its props
            rather than a list of its own headings. `/docs` & `/blog` keep the
            anchor table of contents; only this section trades it away. */}
        <PlaygroundProvider>
          <div className="ui-layout">
            <Sidebar variant="ui" />

            <div className="pt-12">
              <article>{children}</article>
            </div>

            <PropsPanel />
          </div>
        </PlaygroundProvider>
      </main>
    </div>
  );
}
