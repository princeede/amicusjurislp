import type { MetadataRoute } from "next";
import { getPublications } from "@/lib/sanity/publications";
import { domainName, siteNavigation } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${domainName}`;

  const pages = siteNavigation.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date(),
  }));

  const publications = await getPublications();
  const articles = publications.map((publication) => ({
    url: `${baseUrl}/publications/${publication.slug}`,
    lastModified: new Date(publication.publishedAt),
  }));

  return [...pages, ...articles];
}
