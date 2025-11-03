import TableOfContents from "@/components/ui/toc";
import { getAuthor } from "@/utils/authors";
import { formatDate, getAllBlogSlugs } from "@/utils/blog";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@yummacss/ui";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

  // get initials from author name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="py-8">
      <div className="d-g gtc-1 lg:gtc-12 g-8">
        <article className="lg:gc-s-8">
          <header className="mb-12">
            <div className="d-f ai-c g-2 fs-sm tc-white/50 mb-4">
              <Link href="/blog" className="h:tc-white">
                Blog
              </Link>
              <span>/</span>
              <span>{formatDate(meta?.date || "")}</span>
            </div>

            <h1 className="fs-4xl lg:fs-5xl fw-400 mb-6 tc-white">
              {meta?.title}
            </h1>

            <p className="fs-lg tc-white/70 mb-6 lh-5">{meta?.description}</p>

            {author && (
              <div className="d-f ai-c g-4 fs-sm tc-white/70">
                <div className="d-f ai-c g-2">
                  <Image
                  className="rad-9"
                    src={author.avatar}
                    alt={author.name}
                    width={32}
                    height={32}
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
                width={1200}
                height={slug.startsWith("playground-0.0.1-") ? 675 : 630}
                className="w-full h-auto"
                quality={100}
              />
            </div>
          )}

          <div className="max-w-none">
            <Content />
          </div>

          <footer className="mt-16 pt-8 bt-1 bc-white/10">
            <div className="d-f fd-c g-8">
              <div className="d-f ai-c jc-sb">
                <div className="d-f ai-c g-2">
                  <Link
                    href="/blog"
                    className="d-if ai-c g-2 px-4 py-2 rad-1 fs-sm tc-white/70 h:tc-white h:bg-white/20"
                  >
                    <ArrowLeftIcon />
                    Back to Blog
                  </Link>
                </div>
              </div>
            </div>
          </footer>
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
