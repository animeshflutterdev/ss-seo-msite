import type { NormalizedProduct } from "@/types/product";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildProductSchema,
} from "@/lib/seo";

type SeoContentProps = {
  product: NormalizedProduct;
};

export default function SeoContent({ product }: SeoContentProps) {
  const productSchema = buildProductSchema(product);
  const breadcrumbSchema = buildBreadcrumbSchema(product);
  const faqSchema = buildFaqSchema(product);

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