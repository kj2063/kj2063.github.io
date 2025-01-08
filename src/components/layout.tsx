/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Switch } from 'antd';
import { StaticImage } from 'gatsby-plugin-image';
import { useThemeContext } from '@src/context/ThemeContext';
import Header from './header';
import '../styles/layout.css';

type LayoutType = {
  children : React.ReactNode;
}

const Layout = ({ children } : LayoutType) => {
  const { dark, toggleDark } = useThemeContext();

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={dark ? 'dark' : 'light'}>
      <Header siteTitle={data.site.siteMetadata?.title} />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 'var(--size-content)',
          padding: 'var(--size-gutter)',
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: '100px',
            fontSize: 'var(--font-sm)',
            color: 'var(--color-secondary)',
          }}
        >
          © 2022 by
          {' '}
          {data.site.siteMetadata?.title}
        </footer>
      </div>
      <Switch
        className="dark-switcher floating-switch"
        checkedChildren={<StaticImage src="../images/sun.svg" width={16} alt="" />}
        unCheckedChildren={<StaticImage src="../images/moon.svg" width={16} alt="" />}
        checked={!dark}
        onClick={toggleDark}
        size="small"
      />
    </div>
  );
};

export default Layout;
