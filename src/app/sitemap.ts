import { statSync } from "fs";
import { allBlogs, allDocs, allUis } from "content-collections";
import type { MetadataRoute } from "next";

function getFileDate(slug: string, collection: string): Date {
  try {
    return statSync(`src/content/${collection}/${slug}.mdx`).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yummacss.com";

  const docUrls = allDocs.map((doc) => ({
    url: `${baseUrl}/docs/${doc._meta.path}`,
    lastModified: getFileDate(doc._meta.path, "docs"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const uiUrls = allUis
    .filter((ui) => ui._meta.path !== "components")
    .map((ui) => ({
      url: `${baseUrl}/ui/components/${ui._meta.path}`,
      lastModified: getFileDate(ui._meta.path, "ui"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const blogUrls = allBlogs.map((post) => ({
    url: `${baseUrl}/blog/${post._meta.path}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  return [...staticPages, ...docUrls, ...uiUrls, ...blogUrls];
}
