import MobileBreadcrumb from "@/components/ui/MobileBreadcrumb";
import Navbar from "@/components/ui/Navbar";
import TableOfContents from "@/components/ui/TableOfContents";
import UISidebar from "@/components/ui/UiSidebar";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <MobileBreadcrumb />

      <main className="~sm-xxl mx-auto px-6">
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
