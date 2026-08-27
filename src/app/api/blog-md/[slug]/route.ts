import { allBlogs } from "content-collections";
import { getAuthor } from "@/utils/authors";
import { formatDate, isVisible } from "@/utils/blog";
import { mdxToMarkdown } from "@/utils/mdx-markdown";

export const dynamic = "force-dynamic";

function renderBlogMarkdown(post: (typeof allBlogs)[number]): string {
  const body = mdxToMarkdown(post.content ?? "");

  const lines = [`# ${post.title}`, ""];
  if (post.description) lines.push(post.description, "");

  const author = post.authors?.[0] ? getAuthor(post.authors[0]) : undefined;
  const meta = [post.date ? formatDate(post.date) : null, author?.name]
    .filter(Boolean)
    .join(" · ");
  if (meta) lines.push(`_${meta}_`, "");

  if (body) lines.push(body);

  return lines.join("\n");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const post = allBlogs.find((p) => p._meta.path === slug && isVisible(p));

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(renderBlogMarkdown(post), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
