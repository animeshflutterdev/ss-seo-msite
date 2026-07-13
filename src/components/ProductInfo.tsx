import type { NormalizedProduct } from "@/types/product";

type ProductInfoProps = {
  product: NormalizedProduct;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      {product.uses && (
        <section className="content-card">
          <h2>Uses of {product.name}</h2>
          <p>{product.uses}</p>
        </section>
      )}

      <section className="content-card">
        <h2>Product Information</h2>
        <p>{product.description || product.shortDescription}</p>
      </section>

      {product.faqs.length > 0 && (
        <section className="content-card">
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