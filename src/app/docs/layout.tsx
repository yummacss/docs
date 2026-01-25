import MobileBreadcrumb from "@/components/ui/mobile-breadcrumb";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import TableOfContents from "@/components/ui/table-of-contents";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh c-white">
      <Navbar />
      <MobileBreadcrumb />

      <main className="sm-xxl mx-auto px-6">
        <div className="d-g gtc-1 lg:gtc-12 g-8">
          <Sidebar />

          <div className="lg:gc-s-6 pt-26 lg:pt-14">
            <article className="max-w-none">{children}</article>
          </div>

          <TableOfContents />
        </div>
      </main>
    </div>
  );
}
