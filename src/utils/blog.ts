import { allBlogs } from "content-collections";

/** Draft posts are visible in dev only; use `getAllBlogPosts()` in production paths. */
export const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export function isVisible(post: (typeof allBlogs)[number]): boolean {
  return SHOW_DRAFTS || !post.draft;
}

export function getAllBlogSlugs(): string[] {
  return allBlogs.filter(isVisible).map((post) => post._meta.path);
}

export function getAllBlogPosts() {
  return allBlogs
    .filter(isVisible)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function groupPostsByYear(
  posts: Array<(typeof allBlogs)[number]>,
): Map<number, Array<(typeof allBlogs)[number]>> {
  const grouped = new Map<number, Array<(typeof allBlogs)[number]>>();

  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)?.push(post);
  }

  return grouped;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
