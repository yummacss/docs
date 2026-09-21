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
    <>
      <div className="mb:16 pt:12 @lg:gc-s:9">
        <div className="my:8">
          <h1 className="mb:2 c:ink ff-e fs:4xl fw:400">Blog Articles</h1>
          <p className="c:ink/70 fs:lg">
            The latest updates & articles from Yumma CSS.
          </p>
        </div>

        <div>
          {years.map((year, yearIndex) => (
            <div key={year}>
              <div className="mb:16">
                <h2 id={String(year)} className="mb:8 c:ink ff-e fs:4xl fw:400">
                  {year}
                </h2>

                {postsByYear.get(year)?.map((post) => (
                  <article key={post._meta.path} className="mb:12">
                    <Link
                      href={`/blog/${post._meta.path}`}
                      className="d:b fv:oc:ink fv:ow:2"
                    >
                      <div className="d:f fd:c g:6 @sm:fd:r">
                        <div className="@sm:f:1">
                          <h3 className="mb:4 c:ink fs:xxl fw:400">
                            {post.title}
                          </h3>
                          <p className="mb:4 max-w:xs c:ink/70 lh:5">
                            {post.description}
                          </p>
                          <div className="d:f ai:c g:3 c:ink/50 fs:sm">
                            <span>{formatDate(post.date)}</span>
                            {post.draft && (
                              <span className="c:accent fs:xs ls:2 tt:u">
                                Draft
                              </span>
                            )}
                          </div>
                        </div>
                        {post.cover && (
                          <div className="@sm:w:40 @sm:fs:0 @xl:w:56">
                            <div className="o:h b:1 bc:border bg:ink/10">
                              <Image
                                src={post.cover}
                                alt={post.title}
                                unoptimized
                                width={1200}
                                height={675}
                                className="of:c w:100% h:auto us:none"
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
                <hr className="mb:16 bc:border" />
              )}
            </div>
          ))}
        </div>
      </div>

      <TableOfContents />
    </>
  );
}
