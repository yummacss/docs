import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import TableOfContents from "@/components/ui/table-of-contents";
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

  return {
    title: meta?.title || "Blog Post",
    description: meta?.description || "",
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
      <div className="d-g gtc-1 lg:gtc-12 g-8">
        <article className="lg:gc-s-8">
          <header className="mb-12">
            <div className="d-f ai-c g-2 fs-sm c-white/50 mb-4 mt-16">
              <Link href="/blog" className="h:tc-white">
                Blog
              </Link>
              <span>/</span>
              <span>{formatDate(meta?.date || "")}</span>
            </div>

            <h1 className="fs-4xl lg:fs-5xl fw-400 mb-6 c-white">
              {meta?.title}
            </h1>

            <p className="fs-lg c-white/70 mb-6 lh-5">{meta?.description}</p>

            {author && (
              <div className="d-f ai-c g-4 fs-lg c-white/70">
                <div className="d-f ai-c g-2">
                  <Avatar
                    className="br-pill"
                    src={author.avatar}
                    alt={author.name}
                  />
                  <Link
                    href={author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tc-white/70 h:tc-white"
                  >
                    {author.name}
                  </Link>
                </div>
              </div>
            )}
          </header>

          {meta?.cover && (
            <div className="mb-12 o-h b-1 bc-white/10">
              <Image
                src={`/blog/${slug}.png`}
                alt={meta.title || "Blog cover"}
                unoptimized
                width={1200}
                height={630}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="max-w-none">
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
