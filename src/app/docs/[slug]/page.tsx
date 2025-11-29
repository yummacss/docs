import type { Metadata } from "next";
import Banner from "@/components/ui/Banner";
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
    title: meta?.title || "Documentation",
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

  return (
    <>
      <Banner />
      {meta && (
        <div className="mb-8" data-meta>
          <h1 className="fs-4xl fw-400 mb-6 tc-white">{meta.title}</h1>
          {meta.description && (
            <p className="fs-lg tc-white/70">{meta.description}</p>
          )}
        </div>
      )}
      <Content />
    </>
  );
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
