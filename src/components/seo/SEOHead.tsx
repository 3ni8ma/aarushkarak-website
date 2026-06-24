// 2026-06-24 16:30:04
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

export function SEOHead({ title, description, path = '' }: SEOHeadProps) {
  const siteName = 'Aarush Karak';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Software Developer & Spatial Computing`;
  const desc = description || 'Full-stack developer and spatial computing engineer. Building HELIOS, The Coder Bros, and open-source tools.';
  const url = `https://aarushkarak.vercel.app${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
