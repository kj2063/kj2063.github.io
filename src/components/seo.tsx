/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

type SeoType = {
  article?: boolean;
  category?: string;
  dateModified?: string;
  datePublished?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  pathname?: string;
  title: string;
  children?: React.ReactNode;
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const withLeadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`);

const getAbsoluteUrl = (siteUrl: string, value?: string) => {
  if (!value) {
    return siteUrl;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${siteUrl}${withLeadingSlash(value)}`;
};

const getCanonicalPath = (pathname?: string) => {
  if (!pathname) {
    return '/';
  }

  const normalizedPathname = withLeadingSlash(pathname);

  if (normalizedPathname === '/') {
    return normalizedPathname;
  }

  return normalizedPathname.replace(/\/+$/, '');
};

const getKeywordList = (keywords?: string[], category?: string) => {
  const categoryKeywords = category
    ? category.split(',').map((keyword) => keyword.trim()).filter(Boolean)
    : [];

  return Array.from(new Set([...(keywords || []), ...categoryKeywords]));
};

const Seo = ({
  article = false,
  category,
  dateModified,
  datePublished,
  description,
  image,
  keywords,
  noIndex = false,
  pathname,
  title,
  children,
} : SeoType) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            language
            defaultImage
            keywords
            social {
              github
              linkedin
              twitter
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;
  const fullTitle = defaultTitle && title !== defaultTitle ? `${title} | ${defaultTitle}` : title;
  const siteUrl = trimTrailingSlash(site.siteMetadata?.siteUrl || '');
  const language = site.siteMetadata?.language || 'ko-KR';
  const locale = language.replace('-', '_');
  const canonicalPath = getCanonicalPath(pathname);
  const canonicalUrl = getAbsoluteUrl(siteUrl, canonicalPath);
  const metaImage = getAbsoluteUrl(siteUrl, image || site.siteMetadata?.defaultImage);
  const metaKeywords = getKeywordList(keywords || site.siteMetadata?.keywords, category);
  const articleTags = getKeywordList(undefined, category);
  const socialLinks = [
    site.siteMetadata?.social?.github,
    site.siteMetadata?.social?.linkedin,
  ].filter(Boolean);
  const twitterHandle = site.siteMetadata?.social?.twitter;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: defaultTitle,
      url: siteUrl,
      description: site.siteMetadata?.description,
      inLanguage: language,
    },
    {
      '@context': 'https://schema.org',
      '@type': article ? 'BlogPosting' : 'WebPage',
      headline: title,
      name: fullTitle,
      description: metaDescription,
      url: canonicalUrl,
      image: metaImage,
      inLanguage: language,
      author: {
        '@type': 'Person',
        name: site.siteMetadata?.author || defaultTitle,
        sameAs: socialLinks,
      },
      publisher: {
        '@type': 'Organization',
        name: defaultTitle,
        logo: {
          '@type': 'ImageObject',
          url: getAbsoluteUrl(siteUrl, site.siteMetadata?.defaultImage),
        },
      },
      ...(article && {
        datePublished,
        dateModified: dateModified || datePublished,
        mainEntityOfPage: canonicalUrl,
        keywords: articleTags,
        articleSection: category,
      }),
    },
  ];

  return (
    <>
      <html lang={language} />
      <title>{fullTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={metaDescription} />
      {metaKeywords.length > 0 && <meta name="keywords" content={metaKeywords.join(', ')} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {article && datePublished && <meta property="article:published_time" content={datePublished} />}
      {article && (dateModified || datePublished) && <meta property="article:modified_time" content={dateModified || datePublished} />}
      {article && category && <meta property="article:section" content={category} />}
      {articleTags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      {children}
    </>
  );
};

export default Seo;
