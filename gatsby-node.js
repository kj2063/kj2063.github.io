/* eslint-disable */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const fs = require('fs');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'blog',
    });

    createNodeField({
      node,
      name: 'slug',
      value: `/blog${relativeFilePath}`,
    });
  }
};

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/postTemplate.tsx'),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};

/* SEO artifact helpers */
const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return `/${pathname.replace(/^\/+|\/+$/g, '')}`;
};

const getSitemapPriority = (pathname) => {
  if (pathname === '/') {
    return '1.0';
  }

  if (pathname === '/blog') {
    return '0.9';
  }

  if (pathname.startsWith('/blog/')) {
    return '0.8';
  }

  return '0.6';
};

const getSitemapChangefreq = (pathname) => {
  if (pathname === '/' || pathname === '/blog') {
    return 'weekly';
  }

  if (pathname.startsWith('/blog/')) {
    return 'monthly';
  }

  return 'yearly';
};

const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    query SeoArtifactsQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allSitePage {
        nodes {
          path
        }
      }
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
          frontmatter {
            date
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Failed to create SEO artifacts', result.errors);
    return;
  }

  const siteUrl = result.data.site.siteMetadata.siteUrl.replace(/\/+$/, '');
  const publicDirectory = path.join(__dirname, 'public');
  const excludedPaths = new Set([
    '/404',
    '/404.html',
    '/dev-404-page',
    '/gatsby-guide',
    '/page-2',
    '/using-dsg',
    '/using-ssr',
    '/using-typescript',
  ]);
  const lastModifiedByPath = new Map(
    result.data.allMarkdownRemark.nodes.map((node) => [
      normalizePath(node.fields.slug),
      node.frontmatter.date,
    ]),
  );

  const sitemapPaths = Array.from(
    new Set(result.data.allSitePage.nodes.map((node) => normalizePath(node.path))),
  )
    .filter((pathname) => !excludedPaths.has(pathname))
    .sort();

  const sitemapItems = sitemapPaths.map((pathname) => {
    const location = pathname === '/' ? siteUrl : `${siteUrl}${pathname}`;
    const lastmod = lastModifiedByPath.get(pathname);

    return [
      '  <url>',
      `    <loc>${escapeXml(location)}</loc>`,
      lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : null,
      `    <changefreq>${getSitemapChangefreq(pathname)}</changefreq>`,
      `    <priority>${getSitemapPriority(pathname)}</priority>`,
      '  </url>',
    ].filter(Boolean).join('\n');
  });

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapItems,
    '</urlset>',
    '',
  ].join('\n');
  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');

  fs.mkdirSync(publicDirectory, { recursive: true });
  fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(publicDirectory, 'robots.txt'), robots);
};

/* absolute path webpack 설정 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
  });
};
