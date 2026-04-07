import type { MetadataRoute } from "next";
import { domainName } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${domainName}/sitemap.xml`,
  };
}
