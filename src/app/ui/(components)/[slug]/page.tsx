import type { Metadata } from "next";
import Banner from "@/components/ui/banner";
import Navigator from "@/components/ui/navigator";
import { getUINavigation } from "@/utils/navigator";
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
    title: meta?.title || "UI Documentation",
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
      <Banner />
      {meta && (
        <div className="mb-8" data-meta>
          <h1 className="fs-4xl fw-400 mb-6 c-white">{meta.title}</h1>
          {meta.description && (
            <p className="fs-lg c-white/70">{meta.description}</p>
          )}
        </div>
      )}
      <Content />
      <Navigator
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
