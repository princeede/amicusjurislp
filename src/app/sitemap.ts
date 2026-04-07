import type { MetadataRoute } from "next";
import { publications } from "@/lib/publications";
import { domainName, siteNavigation } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${domainName}`;

  const pages = siteNavigation.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date(),
  }));

  const articles = publications.map((publication) => ({
    url: `${baseUrl}/publications/${publication.slug}`,
    lastModified: publication.publishedAt,
  }));

  return [...pages, ...articles];
}
