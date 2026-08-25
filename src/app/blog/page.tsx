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
    // The grid comes from the layout. Docs & UI give columns 1-3 to a sidebar;
    // the blog has none, so the listing spans 1-9 rather than leaving that
    // space empty. The TOC auto-places into 10-12 after it. That is ~724px of
    // content at 1280 instead of the 472px a docs page gets.
    <>
      <div className="mb-16 pt-12 @lg:gc-s-9">
        {/* `ff-e` is explicit: Esteban only applies inside <article> or via the
            class, and this page is not an article. */}
        <div className="my-8">
          <h1 className="mb-2 c-white ff-e fs-4xl fw-400">Blog Articles</h1>
          <p className="c-accent-dim fs-lg">
            The latest updates & articles from Yumma CSS.
          </p>
        </div>

        <div>
          {years.map((year, yearIndex) => (
            <div key={year}>
              <div className="mb-16">
                {/* `id` is load-bearing: toc.tsx collects `main h2` elements
                    that have one, which is how the years reach the sidebar. */}
                <h2 id={String(year)} className="mb-8 c-white ff-e fs-4xl fw-400">
                  {year}
                </h2>

                {postsByYear.get(year)?.map((post) => (
                  <article key={post._meta.path} className="mb-12">
                    <Link
                      href={`/blog/${post._meta.path}`}
                      className="d-b fv:oc-accent fv:ow-2"
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
                          {/* The container grows to 96rem, so without a cap
                              the description reaches ~84 characters at 1600px
                              and keeps going. 32rem holds it near 64. */}
                          <p className="mb-4 max-w-xs c-accent-dim lh-5">
                            {post.description}
                          </p>
                          <div className="d-f ai-c g-2 c-accent-dim fs-sm">
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>
                        {/* 14rem only at @xl, not @lg: at @lg the TOC appears
                          and takes three columns, so bumping the cover at the
                          same breakpoint squeezed the description to ~40
                          characters at exactly 1024px. Waiting until 80rem
                          keeps every width between 45 and 75. */}
                        {post.cover && (
                          <div className="@sm:w-40 @sm:fs-0 @xl:w-56">
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
