import Image from "next/image";
import type { NormalizedProduct } from "@/types/product";

type ProductHeroProps = {
  product: NormalizedProduct;
};

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="pdp-hero">
      <div className="product-image-box">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.imageAlt || product.name}
            width={96}
            height={96}
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <Image
            src="/images/medicine-placeholder.png"
            alt={product.name}
            width={96}
            height={96}
            loading="eager"
            fetchPriority="high"
          />
        )}
      </div>

      <div className="product-hero-content">
        <h1>{product.name}</h1>

        {product.shortDescription && (
          <p className="short-description">{product.shortDescription}</p>
        )}

        {product.composition && (
          <p className="product-meta">
            <strong>Composition:</strong> {product.composition}
          </p>
        )}

        {product.manufacturer && (
          <p className="product-meta">
            <strong>Manufacturer:</strong> {product.manufacturer}
          </p>
        )}

        <div className="price-row">
          {product.price !== null && (
            <span className="price">₹{product.price}</span>
          )}

          {product.mrp !== null && product.mrp !== product.price && (
            <span className="mrp">MRP ₹{product.mrp}</span>
          )}
        </div>

        <p className={product.inStock ? "stock in-stock" : "stock out-stock"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </p>
      </div>
    </section>
  );
}