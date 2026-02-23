import type { Metadata } from "next";
import Banner from "@/components/ui/banner";
import Pagination from "@/components/ui/pagination";
import { getUINavigation } from "@/utils/pagination";
import { getAllUISlugs } from "@/utils/ui-sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");

  const module = await import(`@/content/ui/${slugPath}.mdx`);
  const meta = module.meta;

  return {
    title: meta?.title || "UI Documentation",
    description: meta?.description || "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");

  const module = await import(`@/content/ui/${slugPath}.mdx`);
  const Content = module.default;
  const meta = module.meta;
  const navigation = getUINavigation(slugPath);

  // Check if this is a template page (don't show navigator)
  const isTemplatePage = slugPath.startsWith("templates");

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
      {!isTemplatePage && (
        <Pagination
          previous={navigation.previous}
          next={navigation.next}
          basePath="/ui"
        />
      )}
    </div>
  );
}

export function generateStaticParams() {
  const slugs = getAllUISlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

export const dynamicParams = false;
