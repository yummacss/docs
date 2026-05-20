import type { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
import { getUINavigation } from "@/utils/pagination";
import { getAllUISlugs } from "@/utils/sidebar";

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
  const navigation = getUINavigation(slug);

  return (
    <div className="mb-16">
      {meta && (
        <div className="my-8" data-meta>
          <div className="d-f ai-c jc-sb mb-2">
            <h1 className="c-white fs-4xl fw-400">{meta.title}</h1>
            <Pagination
              previous={navigation.previous}
              next={navigation.next}
              basePath="/ui/components"
            />
          </div>
          {meta.description && (
            <p className="c-white/70 fs-lg">{meta.description}</p>
          )}
        </div>
      )}
      <Content />
    </div>
  );
}

export function generateStaticParams() {
  const slugs = getAllUISlugs();
  // exclude "components" since it has its own index page
  return slugs
    .filter((slug) => slug !== "components")
    .map((slug) => ({ slug }));
}

export const dynamicParams = false;
