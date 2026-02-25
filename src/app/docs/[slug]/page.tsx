import type { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
import { getDocsNavigation } from "@/utils/pagination";
import { getAllSlugs } from "@/utils/sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const module = await import(`@/content/docs/${slug}.mdx`);
  const meta = module.meta;

  return {
    title: meta?.title || "Yumma CSS Documentation",
    description: meta?.description || "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = await import(`@/content/docs/${slug}.mdx`);
  const Content = module.default;
  const meta = module.meta;
  const navigation = getDocsNavigation(slug);

  return (
    <div className="mb-16">
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
        basePath="/docs"
      />
    </div>
  );
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
