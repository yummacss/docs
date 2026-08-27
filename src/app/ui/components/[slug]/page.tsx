import { allUis } from "content-collections";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import InstallButton from "@/components/playground/install-button";
import Description from "@/components/ui/description";
import Pagination from "@/components/ui/pagination";
import { getRegistryTarget } from "@/registry";
import { getUINavigation } from "@/utils/pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ui = allUis.find((u) => u._meta.path === slug);
  const url = `https://yummacss.com/ui/components/${slug}`;

  return {
    title: ui?.title || "Yumma UI",
    description: ui?.description || "",
    alternates: { canonical: url },
    openGraph: {
      title: ui?.title,
      description: ui?.description,
      url,
      images: [
        {
          url: "/ui-og.png",
          width: 1200,
          height: 630,
          alt: ui?.title || "Yumma UI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ui?.title,
      description: ui?.description,
      images: ["/ui-og.png"],
    },
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
            <div className="d-f fs-0 ai-c g-2">
              {/* Only on a component page. The prose pages under this route
                  share it & have nothing to install. */}
              {ui.playground && (
                <InstallButton id={getRegistryTarget(slug).install} />
              )}
              <Pagination
                previous={navigation.previous}
                next={navigation.next}
                basePath="/ui/components"
              />
            </div>
          </div>
          {ui.description && (
            <p className="c-white/70 fs-lg">
              <Description
                text={ui.description}
                primitive={ui.primitive}
                slug={slug}
              />
            </p>
          )}
        </div>
      )}
      <MDXContent />
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
              name: "UI Components",
              item: "https://yummacss.com/ui",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: ui?.title || slug,
              item: `https://yummacss.com/ui/components/${slug}`,
            },
          ],
        }}
      />
    </div>
  );
}

export function generateStaticParams() {
  return allUis
    .filter((ui) => ui._meta.path !== "components")
    .map((ui) => ({ slug: ui._meta.path }));
}

export const dynamicParams = false;
