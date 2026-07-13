// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { getProductBySlug } from "@/lib/api";
// import { SITE_URL } from "@/lib/site";

// type PageProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// function getProductImage(product: any) {
//   return product.ProductImage || "/images/medicine-placeholder.png";
// }

// function getFaqs(product: any) {
//   return [
//     {
//       question: `What is ${product.DisplayName}?`,
//       answer: `${product.DisplayName} is a medicine product containing ${product.SaltName}. Use it only as advised by a doctor.`,
//     },
//     {
//       question: `Is prescription required for ${product.DisplayName}?`,
//       answer:
//         product.PrescriptionOTC === "P"
//           ? `Yes, ${product.DisplayName} requires a valid prescription.`
//           : `No, ${product.DisplayName} may not require a prescription.`,
//     },
//     {
//       question: `Who manufactures ${product.DisplayName}?`,
//       answer: `${product.DisplayName} is manufactured by ${
//         product.MfgGroupName || product.MfgGroup
//       }.`,
//     },
//     {
//       question: `What is the expiry date of ${product.DisplayName}?`,
//       answer: `The expiry date of ${product.DisplayName} is ${product.ExpDate}.`,
//     },
//   ];
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const product = await getProductBySlug(slug);

//   if (!product) {
//     return {
//       title: "Product Not Found",
//       description: "The requested medicine product was not found.",
//     };
//   }

//   const title = product.PageTitle || `${product.DisplayName} | SastaSundar`;
//   const description =
//     product.PageDescription ||
//     `Buy ${product.DisplayName} online. Composition: ${product.SaltName}. Manufacturer: ${
//       product.MfgGroupName || product.MfgGroup
//     }.`;

//   const image = getProductImage(product);

//   return {
//     title,
//     description,
//     keywords:
//       product.PageKeywords ||
//       `${product.DisplayName}, ${product.SaltName}, medicine online`,
//     alternates: {
//       canonical: `/order-medicine/${slug}`,
//     },
//     openGraph: {
//       title,
//       description,
//       type: "website",
//       url: `/order-medicine/${slug}`,
//       images: [
//         {
//           url: image,
//           width: 800,
//           height: 800,
//           alt: product.DisplayName,
//         },
//       ],
//     },
//   };
// }

// export default async function MedicinePdpPage({ params }: PageProps) {
//   const { slug } = await params;
//   const product = await getProductBySlug(slug);

//   if (!product) {
//     notFound();
//   }

//   const productImage = getProductImage(product);
//   const faqs = getFaqs(product);
//   const pageUrl = `${SITE_URL}/order-medicine/${slug}`;
//   const isOutOfStock = product.IsOutOfStock === "Y";

//   const productSchema = {
//     "@context": "https://schema.org",
//     "@type": "Product",
//     name: product.DisplayName,
//     image: [`${SITE_URL}${productImage}`],
//     description: product.SaltName,
//     sku: product.ProductId,
//     brand: {
//       "@type": "Brand",
//       name: product.MfgGroup || product.MktGroup || product.MfgGroupName,
//     },
//     manufacturer: {
//       "@type": "Organization",
//       name: product.MfgGroupName || product.MfgGroup,
//     },
//     offers: {
//       "@type": "Offer",
//       url: pageUrl,
//       priceCurrency: "INR",
//       price: product.OfferPrice,
//       availability: isOutOfStock
//         ? "https://schema.org/OutOfStock"
//         : "https://schema.org/InStock",
//       itemCondition: "https://schema.org/NewCondition",
//     },
//   };

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       {
//         "@type": "ListItem",
//         position: 1,
//         name: "Home",
//         item: SITE_URL,
//       },
//       {
//         "@type": "ListItem",
//         position: 2,
//         name: "Medicine",
//         item: `${SITE_URL}/order-medicine`,
//       },
//       {
//         "@type": "ListItem",
//         position: 3,
//         name: product.DisplayName,
//         item: pageUrl,
//       },
//     ],
//   };

//   const faqSchema = {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     mainEntity: faqs.map((faq) => ({
//       "@type": "Question",
//       name: faq.question,
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: faq.answer,
//       },
//     })),
//   };

//   return (
//     <main style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(productSchema),
//         }}
//       />

//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(breadcrumbSchema),
//         }}
//       />

//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(faqSchema),
//         }}
//       />

//       <nav style={{ fontSize: "14px", marginBottom: "20px" }}>
//         Home / Medicine / {product.DisplayName}
//       </nav>

//       <section>
//         <img
//           src={productImage}
//           alt={product.DisplayName}
//           width="240"
//           height="240"
//           style={{ objectFit: "contain", marginBottom: "16px" }}
//         />

//         <h1>{product.DisplayName}</h1>

//         <p>{product.SaltName}</p>

//         <p>
//           <strong>Brand:</strong> {product.MfgGroup || product.MktGroup}
//         </p>

//         <p>
//           <strong>Manufacturer:</strong> {product.MfgGroupName}
//         </p>

//         <p>
//           <strong>MRP:</strong> ₹{product.MRP}
//         </p>

//         <p>
//           <strong>Offer Price:</strong> ₹{product.OfferPrice}
//         </p>

//         <p>
//           <strong>Status:</strong>{" "}
//           {isOutOfStock ? "Out of Stock" : "Available"}
//         </p>
//       </section>

//       <hr style={{ margin: "24px 0" }} />

//       <section>
//         <h2>Medicine Information</h2>

//         <p>
//           <strong>Composition:</strong> {product.SaltStrength}
//         </p>

//         <p>
//           <strong>Generic Name:</strong> {product.GenericName}
//         </p>

//         <p>
//           <strong>Dosage Form:</strong> {product.DosageForm}
//         </p>

//         <p>
//           <strong>Prescription Required:</strong>{" "}
//           {product.PrescriptionOTC === "P" ? "Yes" : "No"}
//         </p>
//       </section>

//       <hr style={{ margin: "24px 0" }} />

//       <section>
//         <h2>More Information</h2>

//         <p>
//           <strong>Country of Origin:</strong> {product.CountryofOrigin}
//         </p>

//         <p>
//           <strong>Expiry Date:</strong> {product.ExpDate}
//         </p>

//         <p>
//           <strong>Manufactured Address:</strong> {product.MfgAddress}
//         </p>

//         <p>
//           <strong>Marketed By:</strong> {product.MktGroup}
//         </p>
//       </section>

//       <hr style={{ margin: "24px 0" }} />

//       <section>
//         <h2>Frequently Asked Questions</h2>

//         {faqs.map((faq) => (
//           <div key={faq.question} style={{ marginBottom: "16px" }}>
//             <h3>{faq.question}</h3>
//             <p>{faq.answer}</p>
//           </div>
//         ))}
//       </section>
//     </main>
//   );
// }



// import { getProductDetail, getProductIdFromSlug } from "@/lib/api";

// type PageProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// export default async function ProductPage({ params }: PageProps) {
//   const { slug } = await params;

//   const productId = getProductIdFromSlug(slug);
//   const productDetail = await getProductDetail({ productId });

//   return (
//     <main>
//       <h1>Product Detail API Working</h1>

//       <p>
//         <strong>Slug:</strong> {slug}
//       </p>

//       <p>
//         <strong>Product ID:</strong> {productId}
//       </p>

//       <pre>{JSON.stringify(productDetail, null, 2)}</pre>
//     </main>
//   );
// }



import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductHero from "@/components/ProductHero";
import ProductInfo from "@/components/ProductInfo";
import SeoContent from "@/components/SeoContent";
import {
  getProductDetail,
  getProductIdFromSlug,
} from "@/lib/api";
import { buildCanonicalUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const productId = getProductIdFromSlug(slug);

  try {
    const product = await getProductDetail({
      productId,
      slug,
    });

    return {
      title: product.metaTitle,
      description: product.metaDescription,
      alternates: {
        canonical: buildCanonicalUrl(`/order-medicine/${slug}`),
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: product.metaTitle,
        description: product.metaDescription,
        url: buildCanonicalUrl(`/order-medicine/${slug}`),
        type: "website",
        images: product.imageUrl
          ? [
              {
                url: product.imageUrl,
                alt: product.imageAlt || product.name,
              },
            ]
          : [],
      },
    };
  } catch (error) {
    console.error("Metadata product fetch failed:", error);

    return {
      title: "Product Not Found | SastaSundar",
      description: "Product details are currently unavailable.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const productId = getProductIdFromSlug(slug);

  let product;

  try {
    product = await getProductDetail({
      productId,
      slug,
    });
  } catch (error) {
    console.error("Product page fetch failed:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="pdp-page">
      <SeoContent product={product} />

      <Breadcrumb
        productName={product.name}
        categoryName={product.categoryName}
      />

      <ProductHero product={product} />

      <ProductInfo product={product} />
    </main>
  );
}