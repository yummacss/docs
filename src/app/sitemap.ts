import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/utils/sidebar";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yummacss.com";

  // get all documentation slugs
  const docSlugs = getAllSlugs();
  const docUrls = docSlugs.map((slug) => ({
    url: `${baseUrl}/docs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // static pages
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

  return [...staticPages, ...docUrls];
}
