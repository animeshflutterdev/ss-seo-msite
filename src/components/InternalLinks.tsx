import type { NormalizedProduct } from "@/types/product";

type InternalLinksProps = {
  product: NormalizedProduct;
};

export default function InternalLinks({ product }: InternalLinksProps) {
  return (
    <section className="content-card">
      <h2>Related Links</h2>

      <ul className="internal-links">
        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <a href="/order-medicine">Buy Medicines Online</a>
        </li>

        {product.composition && (
          <li>
            <a href={`/salt/${encodeURIComponent(product.composition.toLowerCase())}`}>
              More medicines with {product.composition}
            </a>
          </li>
        )}

        {product.manufacturer && (
          <li>
            <a href={`/manufacturer/${encodeURIComponent(product.manufacturer.toLowerCase())}`}>
              Medicines by {product.manufacturer}
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}