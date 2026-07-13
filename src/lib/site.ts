export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}


export function buildCanonicalUrl(path: string) {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteUrl}${cleanPath}`;
}