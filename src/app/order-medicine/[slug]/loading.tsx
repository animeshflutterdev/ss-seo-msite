import MsiteHeader from "@/components/MsiteHeader";

export default function Loading() {
  return (
    <main className="msite-page">
      <MsiteHeader />

      <section className="product-top">
        <div className="product-image-area">
          <div className="image-skeleton" />
        </div>

        <section className="product-summary-card">
          <div className="product-title-row">
            <div>
              <div className="skeleton title" />
              <div className="skeleton line short" />
            </div>

            <div className="rx-badge">℞</div>
          </div>

          <div className="price-action-row">
            <div>
              <div className="skeleton price" />
              <div className="skeleton line short" />
            </div>

            <button className="add-button" type="button">
              ADD
            </button>
          </div>
        </section>
      </section>

      <section className="delivery-address-row">
        <strong>Deliver to 700001</strong>
        <span>Change</span>
      </section>

      <section className="delivery-green-row">
        <span className="delivery-icon">♨</span>
        <strong>Delivery in 1 day(s)</strong>
      </section>
    </main>
  );
}