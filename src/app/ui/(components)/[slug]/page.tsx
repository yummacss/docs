import type { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
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
    title: meta?.title || "Yumma UI Documentation",
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
        basePath="/ui"
      />
    </div>
  );
}

export function generateStaticParams() {
  const slugs = getAllUISlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
