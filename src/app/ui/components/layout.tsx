import Sidebar from "@/components/ui/sidebar";
import TableOfContents from "@/components/ui/toc";

export default function UIComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="zi-0 mx-auto px-6 docs-container">
      <div className="d-g gtc-1 g-8 @lg:gtc-12">
        <Sidebar variant="ui" />

        <div className="pt-12 @lg:gc-s-6">
          <article>{children}</article>
        </div>

        <TableOfContents />
      </div>
    </main>
  );
}
