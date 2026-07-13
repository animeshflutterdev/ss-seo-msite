type ProductTrustInfoProps = {
  pincode?: string;
};

export default function ProductTrustInfo({
  pincode = "700001",
}: ProductTrustInfoProps) {
  return (
    <>
      <section className="delivery-address-row">
        <strong>Deliver to {pincode}</strong>
        <span>Change</span>
      </section>

      <section className="delivery-green-row">
        <span className="delivery-icon">♨</span>
        <strong>Delivery in 1 day(s)</strong>
      </section>

      <section className="trust-list">
        <div className="trust-row">
          <span className="trust-icon">℞</span>
          <span>
            <strong>Doctor&apos;s Note Required</strong> for this item
          </span>
        </div>

        <div className="trust-row">
          <span className="trust-icon">!</span>
          <span>Expires on: Apr 30, 2028</span>
        </div>

        <div className="trust-row">
          <span className="trust-icon">↻</span>
          <span>
            14 Day(s) <u>Return Policy</u>
          </span>
        </div>

        <div className="trust-row">
          <span className="trust-icon">!</span>
          <span>
            <u>Manufacturer Details</u>
          </span>
        </div>
      </section>
    </>
  );
}