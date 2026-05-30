import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getAllBlogPosts, groupPostsByYear } from "@/utils/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "The latest updates & articles from Yumma CSS.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const postsByYear = groupPostsByYear(posts);
  const years = Array.from(postsByYear.keys()).sort((a, b) => b - a);

  return (
    <div className="pt-14 @sm:pt-16">
      <div className="mx-auto my-16 max-w-lg">
        <h1 className="mt-6 c-white ff-e fs-5xl fw-400">Blog Articles</h1>
        <p className="mt-6 max-w-md c-white/70 fs-lg">
          The latest updates & articles from Yumma CSS.
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        {years.map((year, yearIndex) => (
          <div key={year}>
            <div className="mb-16">
              <h2 className="mb-8 c-white ff-e fs-4xl fw-400">{year}</h2>

              {postsByYear.get(year)?.map((post) => (
                <article key={post.slug} className="mb-12">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="d-b fv:oc-white fv:ow-2"
                  >
                    <div className="d-f fd-c g-8 @lg:fd-r">
                      <div className="@lg:f-1">
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
                      {post.cover && (
                        <div className="@lg:w-64 @lg:fs-0">
                          <div className="o-h b-1 bc-border bg-white/10">
                            <Image
                              src={`/blog/${post.slug}.png`}
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

            {yearIndex < years.length - 1 && <hr className="mb-8 bc-border" />}
          </div>
        ))}
      </div>
    </div>
  );
}
