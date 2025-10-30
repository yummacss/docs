import { formatDate, getAllBlogPosts, groupPostsByYear } from "@/utils/blog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "The latest updates and articles from Yumma CSS.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const postsByYear = groupPostsByYear(posts);
  const years = Array.from(postsByYear.keys()).sort((a, b) => b - a);

  return (
    <div className="pb-16">
      <div className="mx-auto my-16" style={{ maxWidth: "64rem" }}>
        <h1 className="fs-5xl fw-400 mb-6 tc-white">Blog</h1>
        <p className="fs-lg tc-white/70" style={{ maxWidth: "48rem" }}>
          The latest updates and articles from Yumma CSS.
        </p>
      </div>

      <div className="mx-auto" style={{ maxWidth: "64rem" }}>
        {years.map((year, yearIndex) => (
          <div key={year}>
            <div className="mb-16">
              <h2 className="fs-4xl fw-400 mb-8 tc-white">{year}</h2>

              {postsByYear.get(year)?.map((post) => (
                <article key={post.slug} className="mb-12">
                  <div className="d-f fd-c lg:fd-r g-8">
                    <div className="lg:f-1">
                      <h3 className="fs-xxl fw-400 mb-4 tc-white">
                        <Link href={`/blog/${post.slug}`} className="h:td-u">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="tc-white/70 mb-4 lh-5">
                        {post.description}
                      </p>
                      <div className="d-f ai-c g-2 fs-sm tc-white/50">
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    {post.cover && (
                      <div className="lg:w-64 lg:fs-0">
                        <div className="bg-white/10 rad-2 o-h bc-white/5 b-1">
                          <Image
                            src={`/blog/${post.slug}/${post.cover}`}
                            alt={post.title}
                            width={256}
                            height={144}
                            className="w-full h-auto of-c"
                            style={{ aspectRatio: "16/9" }}
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
