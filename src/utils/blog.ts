import { allBlogs } from "content-collections";

export function getAllBlogSlugs(): string[] {
  return allBlogs.map((post) => post._meta.path);
}

export function getAllBlogPosts() {
  return [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
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
