import type { NormalizedProduct } from "@/types/product";
import { buildCanonicalUrl } from "@/lib/site";

type SeoContentProps = {
  product: NormalizedProduct;
};

export default function SeoContent({ product }: SeoContentProps) {
  const canonicalUrl = buildCanonicalUrl(`/order-medicine/${product.slug}`);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDescription,
    image: product.imageUrl ? [product.imageUrl] : undefined,
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
      url: canonicalUrl,
      priceCurrency: "INR",
      price: product.price || 0,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildCanonicalUrl("/"),
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
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema =
    product.faqs.length > 0
      ? {
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
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  );
}