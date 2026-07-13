export default function Loading() {
  return (
    <main className="pdp-page">
      <section className="pdp-hero">
        <div className="image-skeleton" />

        <div className="product-hero-content">
          <div className="skeleton title" />
          <div className="skeleton line" />
          <div className="skeleton line short" />
          <div className="skeleton price" />
        </div>
      </section>

      <section className="content-card">
        <div className="skeleton heading" />
        <div className="skeleton paragraph" />
        <div className="skeleton paragraph" />
      </section>
    </main>
  );
}