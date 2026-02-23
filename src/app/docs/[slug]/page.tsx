import type { Metadata } from "next";
import Banner from "@/components/ui/banner";
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
      <Banner />
      {meta && (
        <div className="mb-8" data-meta>
          <h1 className="mb-6 c-white fs-4xl fw-400">{meta.title}</h1>
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
