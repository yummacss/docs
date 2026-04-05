import type { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
import type { TocItem } from "@/components/ui/toc";
import TableOfContents from "@/components/ui/toc";
import UISidebar from "@/components/ui/ui-sidebar";
import { getUINavigation } from "@/utils/pagination";
import { getAllUISlugs } from "@/utils/ui-sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const module = await import(`@/content/ui/${slug}.mdx`);
  const meta = module.meta;

  return {
    title: meta?.title || "Yumma UI",
    description: meta?.description || "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = await import(`@/content/ui/${slug}.mdx`);
  const Content = module.default;
  const meta = module.meta;
  const toc: TocItem[] = module.toc ?? [];
  const navigation = getUINavigation(slug);

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

export function generateStaticParams() {
  const slugs = getAllUISlugs();
  return slugs
    .filter((slug) => slug !== "components")
    .map((slug) => ({ slug }));
}

export const dynamicParams = false;
