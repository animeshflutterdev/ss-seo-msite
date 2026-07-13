import type { MetadataRoute } from "next";
import { buildCanonicalUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: buildCanonicalUrl("/order-medicine/cal-360-tab-10-tab-cipla-ltd-sx6r74"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}