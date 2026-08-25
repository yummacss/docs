import { allDocs } from "content-collections";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import Pagination from "@/components/ui/pagination";
import { getDocsNavigation } from "@/utils/pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = allDocs.find((d) => d._meta.path === slug);
  const url = `https://yummacss.com/docs/${slug}`;

  return {
    title: doc?.title || "Yumma CSS Documentation",
    description: doc?.description || "",
    alternates: { canonical: url },
    openGraph: {
      title: doc?.title,
      description: doc?.description,
      url,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: doc?.title || "Yumma CSS Documentation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc?.title,
      description: doc?.description,
      images: ["/og.png"],
    },
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: doc?.title,
          description: doc?.description,
          url: `https://yummacss.com/docs/${slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://yummacss.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Documentation",
              item: "https://yummacss.com/docs",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: doc?.title || slug,
              item: `https://yummacss.com/docs/${slug}`,
            },
          ],
        }}
      />
    </div>
  );
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc._meta.path }));
}

export const dynamicParams = false;
