import type { Metadata } from "next";
import type { NormalizedProduct } from "@/types/product";
import { buildCanonicalUrl, getSiteUrl } from "@/lib/site";

export const SEO_REQUIREMENTS = {
  canonicalUrlFormat: {
    rule: "Canonical URL must use production domain, lowercase slug, no query string, no trailing slash for PDP.",
    example: "https://sastasundar.com/order-medicine/cal-360-tab-10-tab-cipla-ltd-sx6r74",
  },

  urlStructureAndRules: {
    pdpPattern: "/order-medicine/[slug]",
    rules: [
      "Use lowercase slugs.",
      "Use hyphen-separated words.",
      "Do not use query parameters for canonical PDP URLs.",
      "Do not allow duplicate PDP URLs for the same product.",
      "Old PDP URLs must 301 redirect to final canonical PDP URL.",
    ],
  },

  metadataRequirements: {
    title: "Product Name | SastaSundar",
    metaDescription:
      "Unique product-specific description. Include product name, usage context, price or buying intent where suitable.",
    h1: "Must match or closely represent the product name.",
    robots: "index, follow for valid PDP. noindex, nofollow for invalid or unavailable SEO pages.",
  },

  targetKeywords: {
    pdp: [
      "buy medicine online",
      "online pharmacy",
      "product name",
      "composition",
      "manufacturer",
      "medicine price",
    ],
  },

  contentRequirementsByPageType: {
    pdp: [
      "Product name",
      "Short product description",
      "Composition",
      "Manufacturer",
      "Price",
      "Availability",
      "Product information",
      "Uses, if available",
      "FAQ, if available",
      "Breadcrumb",
      "Internal links",
    ],
  },

  structuredDataRequirements: {
    pdp: [
      "Product schema",
      "BreadcrumbList schema",
      "FAQPage schema only when FAQ content is visible on page",
    ],
  },

  indexingAndCrawlDirectives: {
    validPdp: "index, follow",
    invalidPdp: "noindex, nofollow",
    duplicatePdp: "canonicalize to primary PDP URL",
  },

  sitemapRequirements: {
    pdp: [
      "Only include canonical 200-status PDP URLs.",
      "Exclude noindex pages.",
      "Exclude redirected URLs.",
      "Update lastModified when product SEO content changes.",
    ],
  },

  prioritySeoPages: {
    currentPhase: ["PDP"],
    nextPhases: ["Category", "Article", "Home", "About Us", "Contact Us"],
  },

  currentRankingAndTrafficDrivingPages: {
    status: "Requires Google Search Console and GA4 export.",
    requiredInputs: [
      "Top organic landing pages",
      "Top queries by clicks",
      "Top queries by impressions",
      "Pages losing traffic",
      "Pages with high impressions and low CTR",
      "Revenue-driving organic landing pages from GA4",
    ],
  },

  internalLinkingRecommendations: {
    pdp: [
      "Link to Home",
      "Link to Medicine category",
      "Link to composition or salt page when available",
      "Link to manufacturer page when available",
      "Link to related products when available",
      "Use crawlable anchor tags with href",
    ],
  },

  redirectRequirements: {
    rules: [
      "Old PDP URLs must 301 redirect to canonical PDP URLs.",
      "Trailing slash versions should redirect to non-trailing slash PDP URLs.",
      "Uppercase slug versions should redirect to lowercase slug versions.",
      "Query-based product URLs should redirect to clean canonical PDP URLs.",
    ],
  },

  robotsTxtRequirements: {
    rules: [
      "Allow SEO-critical PDP, category, article, home pages.",
      "Disallow cart, checkout, account, login, search result pages if not SEO relevant.",
      "Reference sitemap URL.",
    ],
  },

  imageSeoGuidelines: {
    rules: [
      "Use descriptive alt text.",
      "Use fixed width and height to avoid layout shift.",
      "Use optimized image formats.",
      "Use product name in alt text.",
      "Avoid lazy loading for above-the-fold PDP image.",
      "Use fetchPriority high for LCP image.",
    ],
  },

  existingMsiteSeoConcerns: {
    concerns: [
      "Temporary PHP white SEO page is replaced by Flutter.",
      "Final rendered DOM may not contain SEO content.",
      "Search engines may evaluate the final Flutter-rendered page.",
      "SEO content and user-visible content may not match.",
      "Flutter web does not provide strong semantic HTML for SEO-critical pages.",
    ],
    recommendations: [
      "PDP should be server-rendered using Next.js.",
      "SEO content must exist in raw HTML.",
      "SEO content must remain after hydration.",
      "Flutter should not replace PDP DOM.",
      "Only non-SEO app journeys should remain Flutter-controlled.",
    ],
  },
};

export function normalizeSlug(slug: string) {
  return slug.trim().toLowerCase();
}

export function buildPdpPath(slug: string) {
  return `/order-medicine/${normalizeSlug(slug)}`;
}

export function buildPdpCanonicalUrl(slug: string) {
  return buildCanonicalUrl(buildPdpPath(slug));
}

export function buildPdpTitle(product: NormalizedProduct) {
  if (product.metaTitle) {
    return product.metaTitle;
  }

  return `${product.name} | SastaSundar`;
}

export function buildPdpDescription(product: NormalizedProduct) {
  if (product.metaDescription) {
    return product.metaDescription;
  }

  if (product.shortDescription) {
    return product.shortDescription;
  }

  return `Buy ${product.name} online at SastaSundar. Check price, composition, manufacturer and product details.`;
}

export function buildPdpKeywords(product: NormalizedProduct) {
  const keywords = [
    product.name,
    product.composition,
    product.manufacturer,
    product.categoryName,
    "buy medicine online",
    "online pharmacy",
    "medicine price",
    "SastaSundar",
  ];

  return keywords.filter(Boolean);
}

export function buildPdpMetadata(product: NormalizedProduct): Metadata {
  const canonicalUrl = buildPdpCanonicalUrl(product.slug);
  const title = buildPdpTitle(product);
  const description = buildPdpDescription(product);

  return {
    title,
    description,
    keywords: buildPdpKeywords(product),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "SastaSundar",
      images: product.imageUrl
        ? [
            {
              url: product.imageUrl,
              alt: product.imageAlt || `${product.name} image`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export function buildNoIndexMetadata(): Metadata {
  return {
    title: "Product Not Found | SastaSundar",
    description: "Product details are currently unavailable.",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export function buildProductSchema(product: NormalizedProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDescription,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    sku: product.productId,
    brand: {
      "@type": "Brand",
      name: product.brandName || product.manufacturer,
    },
    manufacturer: {
      "@type": "Organization",
      name: product.manufacturer,
    },
    offers: {
      "@type": "Offer",
      url: buildPdpCanonicalUrl(product.slug),
      priceCurrency: "INR",
      price: product.price || 0,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function buildBreadcrumbSchema(product: NormalizedProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getSiteUrl(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.categoryName || "Medicine",
        item: buildCanonicalUrl("/order-medicine"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: buildPdpCanonicalUrl(product.slug),
      },
    ],
  };
}

export function buildFaqSchema(product: NormalizedProduct) {
  if (!product.faqs.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}