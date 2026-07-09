import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HelmetSEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const HelmetSEO: React.FC<HelmetSEOProps> = ({
  title,
  description = 'Ali Portfolio - Professional Developer OS & Production Solutions.',
  image = '/avatar.jpg', // Defaults to our professional photo path
  url,
  type = 'website',
}) => {
  const siteTitle = `${title} | Ali Portfolio`;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
