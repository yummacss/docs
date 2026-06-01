import { allUis } from "content-collections";
import type { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
import { getUINavigation } from "@/utils/pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ui = allUis.find((u) => u._meta.path === slug);

  return {
    title: ui?.title || "Yumma UI",
    description: ui?.description || "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ui = allUis.find((u) => u._meta.path === slug)!;
  const MDXContent = ui.mdx;
  const navigation = getUINavigation(slug);

  return (
    <div className="mb-16">
      {ui && (
        <div className="my-8" data-meta>
          <div className="d-f ai-c jc-sb mb-2">
            <h1 className="c-white fs-4xl fw-400">{ui.title}</h1>
            <Pagination
              previous={navigation.previous}
              next={navigation.next}
              basePath="/ui/components"
            />
          </div>
          {ui.description && (
            <p className="c-white/70 fs-lg">{ui.description}</p>
          )}
        </div>
      )}
      <MDXContent />
    </div>
  );
}

export function generateStaticParams() {
  return allUis
    .filter((ui) => ui._meta.path !== "components")
    .map((ui) => ({ slug: ui._meta.path }));
}

export const dynamicParams = false;
