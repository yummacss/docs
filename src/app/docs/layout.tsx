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
      <Navbar showMobileSidebar />

      <main className="mx-auto px-6 sm-xxl">
        <div className="d-g gtc-1 g-8 lg:gtc-12">
          <Sidebar />

          <div className="pt-12 lg:gc-s-6">
            <article className="max-w-none">{children}</article>
          </div>

          <TableOfContents />
        </div>
      </main>
    </div>
  );
}
