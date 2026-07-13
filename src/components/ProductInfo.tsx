import type { NormalizedProduct } from "@/types/product";

type ProductInfoProps = {
  product: NormalizedProduct;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      <section className="composition-card">
        <div>
          <h2>Composition/Salt</h2>

          <p>
            {product.composition ||
              "Calcium Aspartate 500mg + Calcium Citrate 750mg"}
          </p>
        </div>

        <span className="chevron">›</span>
      </section>

      {product.uses && (
        <section className="more-info-card">
          <h2>Uses of {product.name}</h2>
          <p>{product.uses}</p>
        </section>
      )}

      <section className="more-info-card">
        <h2>More Information</h2>

        <div className="info-block">
          <p className="info-label">Country of origin</p>
          <p className="info-value">India</p>
        </div>

        <div className="info-block">
          <p className="info-label">Manufactured by</p>
          <p className="info-value">
            {product.manufacturer || "Akums Drugs & Pharmaceuticals Ltd.(H5)"}
          </p>
        </div>

        <div className="info-block">
          <p className="info-label">Manufacturer Address</p>
          <p className="info-value">
            {product.description ||
              product.shortDescription ||
              "Manufacturer details will be updated soon."}
          </p>
        </div>
      </section>

      {product.faqs.length > 0 && (
        <section className="more-info-card">
          <h2>Frequently Asked Questions</h2>

          {product.faqs.map((faq) => (
            <article className="faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </section>
      )}
    </>
  );
}