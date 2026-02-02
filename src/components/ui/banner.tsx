import Link from "next/link";
import { getAllBlogPosts } from "@/utils/blog";

export default async function Banner() {
  const posts = await getAllBlogPosts();
  const latestPost = posts[0];

  if (!latestPost) return null;

  return (
    <div className="p-r o-h mb-8 br-pill">
      <div className="rainbow p-a i-0" />
      <div className="p-r d-f ai-c jc-c py-3 px-4 fs-sm fw-600 c-white bf-b-sm us-none">
        <Link href={`/blog/${latestPost.slug}`}>
          {latestPost.title} <span className="ml-2">🎉</span>
        </Link>
      </div>
    </div>
  );
}
