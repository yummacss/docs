import type { Metadata } from "next";
import Banner from "@/components/banner";
import { getAllSlugs } from "@/utils/sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const module = await import(`@/content/docs/${slug}.mdx`);
  const frontmatter = module.frontmatter;

  return {
    title: frontmatter?.title || "Documentation",
    description: frontmatter?.description || "",
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
  const frontmatter = module.frontmatter;

  return (
    <>
      <Banner />
      {frontmatter && (
        <div className="mb-8" data-frontmatter>
          <h1 className="fs-4xl fw-400 mb-6 tc-white">{frontmatter.title}</h1>
          {frontmatter.description && (
            <p className="fs-lg tc-white/70">{frontmatter.description}</p>
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
