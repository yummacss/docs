import { allBlogs, allDocs, allUis } from "content-collections";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yummacss.com";

  const docUrls = allDocs.map((doc) => ({
    url: `${baseUrl}/docs/${doc._meta.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const uiUrls = allUis.map((ui) => ({
    url: `${baseUrl}/ui/components/${ui._meta.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogUrls = allBlogs.map((post) => ({
    url: `${baseUrl}/blog/${post._meta.path}`,
    lastModified: new Date(),
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
      url: `${baseUrl}/ui`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ui/components`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
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
