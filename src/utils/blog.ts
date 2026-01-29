export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  authors: string;
}

// list of all blog post slugs present in `src/content/blog/` directory
const blogSlugs = [
  "yummacss-0.1.0",
  "yummacss-1.0.0",
  "yummacss-1.1.0",
  "yummacss-1.2.0",
  "yummacss-2.0.0",
  "yummacss-2.1.0",
  "yummacss-3.0.0",
  "api-1.0.0",
  "yummacss-3.1.0",
  "yummacss-3.2.0",
  "yummacss-3.3.0",
  "yummacss-3.4.0",
  "yummacss-3.5.0",
  "hello-yumma-ui",
  "yummacss-3.6.0",
  "yummacss-3.7.0",
  "introducing-templates",
  "yummacss-3.8.0",
  "yummacss-3.9.0",
  // "yummacss-3.10.0",
];

export function getAllBlogSlugs(): string[] {
  return blogSlugs;
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const posts: BlogPostMeta[] = [];

  for (const slug of blogSlugs) {
    try {
      const module = await import(`../content/blog/${slug}.mdx`);
      const meta = module.meta;

      if (meta) {
        posts.push({
          slug,
          title: meta.title || slug,
          description: meta.description || "",
          date: meta.date || "",
          cover: meta.cover,
          authors: meta.authors || "",
        });
      }
    } catch (error) {
      console.error(`Failed to load blog post: ${slug}`, error);
    }
  }

  // sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function groupPostsByYear(
  posts: BlogPostMeta[],
): Map<number, BlogPostMeta[]> {
  const grouped = new Map<number, BlogPostMeta[]>();

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
