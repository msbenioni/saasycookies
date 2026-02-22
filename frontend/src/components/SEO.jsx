import { Helmet } from 'react-helmet-async';
import { site } from '../config/site';

export default function SEO({ 
  title, 
  description, 
  image = site.seo.ogImage,
  url = site.seo.url,
  type = 'website',
  schema
}) {
  const pageTitle = title ? `${title} | ${site.brand.name}` : site.seo.defaultTitle;
  const pageDescription = description || site.seo.defaultDescription;
  const pageUrl = url ? `${site.seo.url}${url}` : site.seo.url;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={`${site.seo.url}${image}`} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={site.brand.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${site.seo.url}${image}`} />

      {/* Additional Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content={site.brand.name} />

      {/* Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
