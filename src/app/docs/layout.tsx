import MobileBreadcrumb from "@/components/ui/MobileBreadcrumb";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/sidebar";
import TableOfContents from "@/components/ui/TableOfContents";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh tc-white">
      <Navbar />
      <MobileBreadcrumb />

      <main className="~sm-xxl mx-auto px-6">
        <div className="d-g gtc-1 lg:gtc-12 g-8">
          <Sidebar />

          <div className="lg:gc-s-6">
            <article className="max-w-none">{children}</article>
          </div>

          <TableOfContents />
        </div>
      </main>
    </div>
  );
}
