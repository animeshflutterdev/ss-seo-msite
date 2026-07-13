import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getSiteUrl()}/order-medicine/cal-123`,
      lastModified: new Date("2025-11-02"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}