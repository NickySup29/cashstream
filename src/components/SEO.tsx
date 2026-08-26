import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export default function SEO({ 
  title = "CashStream Advisors | Cross-Border Tax & Regulatory Experts",
  description = "Tactical intelligence on cross-border tax, FEMA regulations, and global corporate stewardship for high-net-worth individuals and corporations.",
  url = "https://cashstreamadvisors.com",
  image = "https://cashstreamadvisors.com/og-image.jpg",
  type = "website",
  structuredData
}: SEOProps) {
  const pageStructuredData = structuredData
    ? Array.isArray(structuredData) ? structuredData : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {pageStructuredData.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": pageStructuredData,
          })}
        </script>
      )}
    </Helmet>
  );
}
