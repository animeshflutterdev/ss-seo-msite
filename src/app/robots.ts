import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/order-medicine/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}