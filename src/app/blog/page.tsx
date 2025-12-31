import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getAllBlogPosts, groupPostsByYear } from "@/utils/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "The latest updates and articles from Yumma CSS.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const postsByYear = groupPostsByYear(posts);
  const years = Array.from(postsByYear.keys()).sort((a, b) => b - a);

  return (
    <div className="pt-14 sm:pt-16">
      <div className="mx-auto my-16" style={{ maxWidth: "64rem" }}>
        <h1 className="fs-5xl fw-400 mt-6 c-white">Blog articles</h1>
        <p className="fs-lg c-white/70" style={{ maxWidth: "48rem" }}>
          The latest updates and articles from Yumma CSS.
        </p>
      </div>

      <div className="mx-auto" style={{ maxWidth: "64rem" }}>
        {years.map((year, yearIndex) => (
          <div key={year}>
            <div className="mb-16">
              <h2 className="fs-4xl fw-400 mb-8 c-white">{year}</h2>

              {postsByYear.get(year)?.map((post) => (
                <article key={post.slug} className="mb-12">
                  <div className="d-f fd-c lg:fd-r g-8">
                    <div className="lg:f-1">
                      <h3 className="fs-xxl fw-400 mb-4 c-white">
                        <Link href={`/blog/${post.slug}`} className="h:td-u">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="c-white/70 mb-4 lh-5">{post.description}</p>
                      <div className="d-f ai-c g-2 fs-sm c-white/50">
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    {post.cover && (
                      <div className="lg:w-64 lg:fs-0">
                        <div className="bg-white/10 o-h bc-white/5 b-1">
                          <Image
                            src={`/blog/${post.slug}.png`}
                            alt={post.title}
                            width={1200}
                            height={675}
                            className="w-full h-auto of-c"
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
