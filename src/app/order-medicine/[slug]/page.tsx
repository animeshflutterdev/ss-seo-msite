import { notFound, permanentRedirect } from "next/navigation";
import MsiteHeader from "@/components/MsiteHeader";
import ProductHero from "@/components/ProductHero";
import ProductInfo from "@/components/ProductInfo";
import ProductTrustInfo from "@/components/ProductTrustInfo";
import SeoContent from "@/components/SeoContent";
import { getCachedProductDetail, getProductIdFromSlug } from "@/lib/api";
import {
  buildNoIndexMetadata,
  buildPdpMetadata,
  buildPdpPath,
  normalizeSlug,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const productId = getProductIdFromSlug(normalizedSlug);

  try {
    const product = await getCachedProductDetail({
      productId,
      slug: normalizedSlug,
    });

    return buildPdpMetadata(product);
  } catch (error) {
    console.error("PDP metadata fetch failed:", error);
    return buildNoIndexMetadata();
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);

  if (slug !== normalizedSlug) {
    permanentRedirect(buildPdpPath(normalizedSlug));
  }

  const productId = getProductIdFromSlug(normalizedSlug);

  let product;

  try {
    product = await getCachedProductDetail({
      productId,
      slug: normalizedSlug,
    });
  } catch (error) {
    console.error("PDP fetch failed:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="msite-page">
      <SeoContent product={product} />

      <MsiteHeader />

      <ProductHero product={product} />

      <ProductTrustInfo />

      <ProductInfo product={product} />
    </main>
  );
}