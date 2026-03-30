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
    <div className="pt-14 sm:pt-16">
      <div className="mx-auto my-16" style={{ maxWidth: "64rem" }}>
        <h1 className="mt-6 c-white ff-e fs-5xl fw-400">Blog Articles</h1>
        <p className="c-white/70 mt-6 fs-lg" style={{ maxWidth: "48rem" }}>
          The latest updates & articles from Yumma CSS.
        </p>
      </div>

      <div className="mx-auto" style={{ maxWidth: "64rem" }}>
        {years.map((year, yearIndex) => (
          <div key={year}>
            <div className="mb-16">
              <h2 className="mb-8 c-white ff-e fs-4xl fw-400">{year}</h2>

              {postsByYear.get(year)?.map((post) => (
                <article key={post.slug} className="mb-12">
                  <div className="d-f fd-c g-8 lg:fd-r">
                    <div className="lg:f-1">
                      <h3 className="mb-4 c-white fs-xxl fw-400">
                        <Link href={`/blog/${post.slug}`} className="h:td-u">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="c-white/70 mb-4 lh-5">{post.description}</p>
                      <div className="d-f c-white/50 ai-c g-2 fs-sm">
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    {post.cover && (
                      <div className="lg:w-64 lg:fs-0">
                        <div className="o-h b-1 bc-white/10 bg-white/10 br-md">
                          <Image
                            src={`/blog/${post.slug}.png`}
                            alt={post.title}
                            unoptimized
                            width={1200}
                            height={675}
                            className="of-c w-full h-auto br-md us-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {yearIndex < years.length - 1 && (
              <hr className="mb-8 bc-white/10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
