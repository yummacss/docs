export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  authors: string;
}

// List of all blog post slugs
// This should match the MDX files in src/content/blog/
const blogSlugs = [
  "api-1.0.0",
  "playground-0.0.1",
  "ui-0.1.0",
  "yummacss-0.1.0",
  "yummacss-1.0.0",
  "yummacss-1.1.0",
  "yummacss-1.2.0",
  "yummacss-2.0.0",
  "yummacss-2.1.0",
  "yummacss-3.0.0",
  "yummacss-3.1.0",
  "yummacss-3.2.0",
  "yummacss-3.3.0",
  "yummacss-3.4.0",
  "yummacss-3.5.0",
];

export function getAllBlogSlugs(): string[] {
  return blogSlugs;
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const posts: BlogPostMeta[] = [];

  for (const slug of blogSlugs) {
    try {
      const module = await import(`@/content/blog/${slug}.mdx`);
      const frontmatter = module.frontmatter;

      if (frontmatter) {
        posts.push({
          slug,
          title: frontmatter.title || slug,
          description: frontmatter.description || "",
          date: frontmatter.date || "",
          cover: frontmatter.cover,
          authors: frontmatter.authors || "",
        });
      }
    } catch (error) {
      console.error(`Failed to load blog post: ${slug}`, error);
    }
  }

  // Sort by date, newest first
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
