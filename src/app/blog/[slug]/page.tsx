import { allBlogs } from "content-collections";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import JsonLd from "@/components/json-ld";
import TableOfContents from "@/components/ui/toc";
import { getAuthor } from "@/utils/authors";
import { formatDate } from "@/utils/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allBlogs.find((p) => p._meta.path === slug);
  const url = `https://yummacss.com/blog/${slug}`;
  const image = post?.cover || "/og.png";

  return {
    title: post?.title || "Blog Post",
    description: post?.description || "",
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      publishedTime: post?.date,
      authors: ["Renildo Pereira"],
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post?.title || "Yumma CSS Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.description,
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
  const post = allBlogs.find((p) => p._meta.path === slug)!;
  const MDXContent = post.mdx;

  const author = post?.authors?.[0] ? getAuthor(post.authors[0]) : undefined;

  return (
    <div className="py-8">
      <div className="d-g gtc-1 g-8 @lg:gtc-12">
        <article className="@lg:gc-s-8">
          <header className="mb-12">
            <div className="d-f ai-c g-2 mb-4 mt-16 c-white/50 fs-sm">
              <Link href="/blog" className="h:c-white fv:oc-white fv:ow-2">
                Blog
              </Link>
              <span>/</span>
              <span>{formatDate(post?.date || "")}</span>
            </div>

            <h1 className="mb-2 c-white fs-4xl fw-400 @lg:fs-5xl">
              {post?.title}
            </h1>

            <p className="mb-6 c-white/70 fs-lg lh-5">{post?.description}</p>

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

          {post?.cover && (
            <div className="o-h b-1 mb-12 bc-border">
              <Image
                src={post.cover}
                alt={post.title || "Blog cover"}
                unoptimized
                width={1200}
                height={630}
                className="w-100% h-auto bg-surface us-none"
              />
            </div>
          )}

          <div>
            <MDXContent />
          </div>
        </article>

        <TableOfContents />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post?.title,
          description: post?.description,
          datePublished: post?.date,
          author: {
            "@type": "Person",
            name: "Renildo Pereira",
          },
          url: `https://yummacss.com/blog/${slug}`,
        }}
      />
    </div>
  );
}

export function generateStaticParams() {
  return allBlogs.map((post) => ({ slug: post._meta.path }));
}

export const dynamicParams = false;
