import MobileBreadcrumb from "@/components/ui/mobile-breadcrumb";
import Navbar from "@/components/ui/navbar";
import TableOfContents from "@/components/ui/table-of-contents";
import UISidebar from "@/components/ui/ui-sidebar";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <MobileBreadcrumb />

      <main className="~sm-xxl mx-auto px-6 pt-26 lg:pt-14">
        <div className="d-g gtc-1 lg:gtc-12 g-8">
          <UISidebar />

          <div className="lg:gc-s-6">
            <article className="max-w-none">{children}</article>
          </div>

          <TableOfContents />
        </div>
      </main>
    </div>
  );
}
