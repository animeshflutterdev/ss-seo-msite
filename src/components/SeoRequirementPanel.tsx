import { SEO_REQUIREMENTS } from "@/lib/seo";

export default function SeoRequirementPanel() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <section className="content-card seo-debug-panel">
      <h2>SEO Requirement Coverage</h2>

      <details open>
        <summary>Canonical URL format</summary>
        <p>{SEO_REQUIREMENTS.canonicalUrlFormat.rule}</p>
      </details>

      <details>
        <summary>URL structure and rules</summary>
        <ul>
          {SEO_REQUIREMENTS.urlStructureAndRules.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Metadata requirements</summary>
        <ul>
          <li>Title: {SEO_REQUIREMENTS.metadataRequirements.title}</li>
          <li>Description: {SEO_REQUIREMENTS.metadataRequirements.metaDescription}</li>
          <li>H1: {SEO_REQUIREMENTS.metadataRequirements.h1}</li>
          <li>Robots: {SEO_REQUIREMENTS.metadataRequirements.robots}</li>
        </ul>
      </details>

      <details>
        <summary>Target keywords</summary>
        <ul>
          {SEO_REQUIREMENTS.targetKeywords.pdp.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Content requirements by page type</summary>
        <ul>
          {SEO_REQUIREMENTS.contentRequirementsByPageType.pdp.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Structured data requirements</summary>
        <ul>
          {SEO_REQUIREMENTS.structuredDataRequirements.pdp.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Indexing and crawl directives</summary>
        <p>Valid PDP: {SEO_REQUIREMENTS.indexingAndCrawlDirectives.validPdp}</p>
        <p>Invalid PDP: {SEO_REQUIREMENTS.indexingAndCrawlDirectives.invalidPdp}</p>
      </details>

      <details>
        <summary>Sitemap requirements</summary>
        <ul>
          {SEO_REQUIREMENTS.sitemapRequirements.pdp.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Priority SEO pages</summary>
        <p>Current phase: {SEO_REQUIREMENTS.prioritySeoPages.currentPhase.join(", ")}</p>
      </details>

      <details>
        <summary>Current ranking and traffic-driving pages</summary>
        <p>{SEO_REQUIREMENTS.currentRankingAndTrafficDrivingPages.status}</p>
      </details>

      <details>
        <summary>Internal linking recommendations</summary>
        <ul>
          {SEO_REQUIREMENTS.internalLinkingRecommendations.pdp.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Redirect requirements</summary>
        <ul>
          {SEO_REQUIREMENTS.redirectRequirements.rules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Robots.txt requirements</summary>
        <ul>
          {SEO_REQUIREMENTS.robotsTxtRequirements.rules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Image SEO guidelines</summary>
        <ul>
          {SEO_REQUIREMENTS.imageSeoGuidelines.rules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <details>
        <summary>Existing Msite SEO concerns and improvements</summary>
        <h3>Concerns</h3>
        <ul>
          {SEO_REQUIREMENTS.existingMsiteSeoConcerns.concerns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3>Recommendations</h3>
        <ul>
          {SEO_REQUIREMENTS.existingMsiteSeoConcerns.recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}