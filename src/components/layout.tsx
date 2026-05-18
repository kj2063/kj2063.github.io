/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useThemeContext } from '@src/context/ThemeContext';
import Header from './header';
import '../styles/layout.css';

type LayoutType = {
  children : React.ReactNode;
}

const Layout = ({ children } : LayoutType) => {
  const { dark, toggleDark } = useThemeContext();
  const themeToggleLabel = dark ? '라이트 모드로 전환' : '다크 모드로 전환';

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
      <div className="siteShell">
        <main className="siteMain">{children}</main>
        <footer className="siteFooter">
          <div className="siteFooterInner">
            <p className="siteFooterDescription">
              © 2022 by
              {' '}
              <strong className="siteFooterTitle">{data.site.siteMetadata?.title}</strong>
            </p>
          </div>
        </footer>
      </div>
      <button
        type="button"
        className={dark ? 'themeToggle floatingThemeToggle isDark' : 'themeToggle floatingThemeToggle isLight'}
        aria-label={themeToggleLabel}
        aria-checked={dark}
        role="switch"
        title={themeToggleLabel}
        onClick={toggleDark}
      >
        <span className="themeToggleTrack" aria-hidden="true">
          <span className="themeToggleThumb">
            {dark
              ? (
                <StaticImage
                  key="theme-moon-icon"
                  src="../images/moon.svg"
                  width={14}
                  alt=""
                />
              )
              : (
                <StaticImage
                  key="theme-sun-icon"
                  src="../images/sun.svg"
                  width={14}
                  alt=""
                />
              )}
          </span>
        </span>
      </button>
    </div>
  );
};

export default Layout;
