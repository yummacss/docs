import Link from "next/link";
import { getAllBlogPosts } from "@/utils/blog";

export default async function Banner() {
  const posts = await getAllBlogPosts();
  const latestPost = posts[0];

  if (!latestPost) return null;

  return (
    <div className="p-r o-h mb-8">
      <div className="p-a i-0 rainbow" />
      <div className="d-f p-r ai-c jc-c py-3 px-4 c-white fs-sm fw-600 bf-b-sm us-none">
        <Link href={`/blog/${latestPost.slug}`}>{latestPost.title}</Link>
      </div>
    </div>
  );
}
