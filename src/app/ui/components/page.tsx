import type { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
import type { TocItem } from "@/components/ui/toc";
import TableOfContents from "@/components/ui/toc";
import UISidebar from "@/components/ui/ui-sidebar";
import { getUINavigation } from "@/utils/pagination";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse all Yumma UI components.",
};

export default async function Page() {
  const module = await import("@/content/ui/components.mdx");
  const Content = module.default;
  const meta = module.meta;
  const toc: TocItem[] = module.toc ?? [];
  const navigation = getUINavigation("components");

  return (
    <div className="d-g gtc-1 g-8 lg:gtc-12">
      <UISidebar />

      <div className="pt-12 lg:gc-s-6">
        <article className="max-w-none mb-16">
          {meta && (
            <div className="my-8" data-meta>
              <h1 className="mb-2 c-white fs-4xl fw-400">{meta.title}</h1>
              {meta.description && (
                <p className="c-white/70 fs-lg">{meta.description}</p>
              )}
            </div>
          )}
          <Content />
          <Pagination
            previous={navigation.previous}
            next={navigation.next}
            basePath="/ui/components"
          />
        </article>
      </div>

      <TableOfContents items={toc} />
    </div>
  );
}
