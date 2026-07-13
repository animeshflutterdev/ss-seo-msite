import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/order-medicine/",
          "/category/",
          "/articles/",
          "/about-us",
          "/contact-us",
        ],
        disallow: [
          "/cart",
          "/checkout",
          "/login",
          "/account",
          "/profile",
          "/search",
          "/api/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}