import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TableOfContents from "@/components/ui/toc";
import { formatDate, getAllBlogPosts, groupPostsByYear } from "@/utils/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "The latest updates & articles from Yumma CSS.",
  openGraph: {
    title: "Blog · Yumma CSS",
    description: "The latest updates & articles from Yumma CSS.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yumma CSS Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog · Yumma CSS",
    description: "The latest updates & articles from Yumma CSS.",
    images: ["/og.png"],
  },
};

export default async function BlogPage() {
  const posts = getAllBlogPosts();
  const postsByYear = groupPostsByYear(posts);
  const years = Array.from(postsByYear.keys()).sort((a, b) => b - a);

  return (
    // The grid comes from the layout. Docs & UI land their content in columns
    // 4-9 because a gc-s-3 sidebar occupies 1-3 first; with no sidebar here,
    // the same columns are set explicitly. The TOC auto-places into 10-12.
    <>
      <div className="mb-16 pt-12 @lg:gcs-4 @lg:gce-10">
        {/* `ff-e` is explicit: Esteban only applies inside <article> or via the
            class, and this page is not an article. */}
        <div className="my-8">
          <h1 className="mb-2 c-white ff-e fs-4xl fw-400">Blog Articles</h1>
          <p className="c-white/70 fs-lg">
            The latest updates & articles from Yumma CSS.
          </p>
        </div>

        <div>
          {years.map((year, yearIndex) => (
            <div key={year}>
              <div className="mb-16">
                {/* `id` is load-bearing: toc.tsx collects `main h2` elements
                    that have one, which is how the years reach the sidebar. */}
                <h2
                  id={String(year)}
                  className="mb-8 c-white ff-e fs-4xl fw-400"
                >
                  {year}
                </h2>

                {postsByYear.get(year)?.map((post) => (
                  <article key={post._meta.path} className="mb-12">
                    <Link
                      href={`/blog/${post._meta.path}`}
                      className="d-b fv:oc-white fv:ow-2"
                    >
                      {/* Goes side by side at @sm, not @lg: by 40rem the column
                        is already ~592px, which fits a 10rem cover beside the
                        text. Waiting for @lg left the cover full width, and
                        nine of those made the page enormous. */}
                      <div className="d-f fd-c g-6 @sm:fd-r">
                        <div className="@sm:f-1">
                          <h3 className="mb-4 c-white fs-xxl fw-400">
                            {post.title}
                          </h3>
                          <p className="mb-4 c-white/70 lh-5">
                            {post.description}
                          </p>
                          <div className="d-f ai-c g-2 c-white/50 fs-sm">
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>
                        {/* Cover is sized against the docs measure, not the old
                          64rem column: 16rem left the title only 184px. */}
                        {post.cover && (
                          <div className="@sm:w-40 @sm:fs-0">
                            <div className="o-h b-1 bc-border bg-white/10">
                              <Image
                                src={post.cover}
                                alt={post.title}
                                unoptimized
                                width={1200}
                                height={675}
                                className="of-c w-100% h-auto us-none"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {yearIndex < years.length - 1 && (
                <hr className="mb-16 bc-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      <TableOfContents />
    </>
  );
}
