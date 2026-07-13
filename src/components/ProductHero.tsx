import Image from "next/image";
import type { NormalizedProduct } from "@/types/product";

type ProductHeroProps = {
  product: NormalizedProduct;
};

export default function ProductHero({ product }: ProductHeroProps) {
  const productImage = product.imageUrl || "/images/medicine-placeholder.png";

  const price = product.price ?? 176.3;
  const mrp = product.mrp ?? 215;

  const discount =
    mrp && price && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0;

  const perUnitPrice =
    price && product.name
      ? `₹ 11.75/Tablet (inclusive of all taxes)`
      : "Inclusive of all taxes";

  return (
    <section className="product-top">
      <div className="product-image-area">
        <Image
          src={productImage}
          alt={product.imageAlt || product.name}
          width={220}
          height={220}
          loading="eager"
          fetchPriority="high"
          className="product-main-image"
        />
      </div>

      <section className="product-summary-card">
        <div className="product-title-row">
          <div>
            <h1>{product.name}</h1>

            <p className="brand-name">
              By {product.manufacturer || product.brandName || "SastaSundar"}
            </p>
          </div>

          <div className="rx-badge" aria-label="Prescription required">
            ℞
          </div>
        </div>

        <div className="price-action-row">
          <div className="price-block">
            <div className="price-line">
              <span className="selling-price">₹{price}</span>

              {mrp && mrp > price && (
                <span className="mrp-price">₹{mrp}</span>
              )}

              {discount > 0 && (
                <span className="discount-badge">{discount}% Off</span>
              )}
            </div>

            <p className="unit-price">{perUnitPrice}</p>
          </div>

          <button className="add-button" type="button">
            ADD
          </button>
        </div>
      </section>
    </section>
  );
}