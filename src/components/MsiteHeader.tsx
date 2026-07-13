export default function MsiteHeader() {
  return (
    <header className="msite-header">
      <div className="header-icon" aria-hidden="true">
        ←
      </div>

      <div className="header-spacer" />

      <div className="header-icon" aria-hidden="true">
        ⌕
      </div>

      <div className="header-icon cart-icon" aria-hidden="true">
        🛒
      </div>
    </header>
  );
}