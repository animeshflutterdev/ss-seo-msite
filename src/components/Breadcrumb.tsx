type BreadcrumbProps = {
  productName: string;
  categoryName?: string;
};

export default function Breadcrumb({
  productName,
  categoryName = "Medicine",
}: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span>/</span>
      <a href="/order-medicine">{categoryName}</a>
      <span>/</span>
      <span>{productName}</span>
    </nav>
  );
}