import { allDocs } from "content-collections";
import type { Metadata } from "next";
import Pagination from "@/components/ui/pagination";
import { getDocsNavigation } from "@/utils/pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = allDocs.find((d) => d._meta.path === slug);

  return {
    title: doc?.title || "Yumma CSS Documentation",
    description: doc?.description || "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = allDocs.find((d) => d._meta.path === slug)!;
  const MDXContent = doc.mdx;
  const navigation = getDocsNavigation(slug);

  return (
    <div className="mb-16">
      {doc && (
        <div className="my-8" data-meta>
          <div className="d-f ai-c jc-sb mb-2">
            <h1 className="c-white fs-4xl fw-400">{doc.title}</h1>
            <Pagination
              previous={navigation.previous}
              next={navigation.next}
              basePath="/docs"
            />
          </div>
          {doc.description && (
            <p className="c-white/70 fs-lg">{doc.description}</p>
          )}
        </div>
      )}
      <MDXContent />
    </div>
  );
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc._meta.path }));
}

export const dynamicParams = false;
