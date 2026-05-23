import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import TableOfContents from "@/components/ui/toc";
import { getAuthor } from "@/utils/authors";
import { formatDate, getAllBlogSlugs } from "@/utils/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const module = await import(`@/content/blog/${slug}.mdx`);
  const meta = module.meta;

  const image = meta?.cover ? `/blog/${slug}.png` : "/og.png";

  return {
    title: meta?.title || "Blog Post",
    description: meta?.description || "",
    openGraph: {
      type: "article",
      publishedTime: meta?.date,
      authors: ["Renildo Pereira"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: meta?.title || "Yumma CSS Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title,
      description: meta?.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = await import(`@/content/blog/${slug}.mdx`);
  const Content = module.default;
  const meta = module.meta;

  const author = meta?.authors ? getAuthor(meta.authors) : undefined;

  return (
    <div className="py-8">
      <div className="d-g gtc-1 g-8 lg:gtc-12">
        <article className="lg:gc-s-8">
          <header className="mb-12">
            <div className="d-f ai-c g-2 mb-4 mt-16 c-white/50 fs-sm">
              <Link href="/blog" className="h:c-white fv:oc-white fv:ow-2">
                Blog
              </Link>
              <span>/</span>
              <span>{formatDate(meta?.date || "")}</span>
            </div>

            <h1 className="mb-2 c-white fs-4xl fw-400 lg:fs-5xl">
              {meta?.title}
            </h1>

            <p className="mb-6 c-white/70 fs-lg lh-5">{meta?.description}</p>

            {author && (
              <div className="d-f ai-c g-4 c-white/70 fs-lg">
                <div className="d-f ai-c g-2">
                  <Avatar src={author.avatar} alt={author.name} />
                  <Link
                    href={author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="c-white/70 h:c-white fv:oc-white fv:ow-2"
                  >
                    {author.name}
                  </Link>
                </div>
              </div>
            )}
          </header>

          {meta?.cover && (
            <div className="o-h b-1 mb-12 bc-border">
              <Image
                src={`/blog/${slug}.png`}
                alt={meta.title || "Blog cover"}
                unoptimized
                width={1200}
                height={630}
                className="w-100% h-auto bg-surface us-none"
              />
            </div>
          )}

          <div>
            <Content />
          </div>
        </article>

        <TableOfContents />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
