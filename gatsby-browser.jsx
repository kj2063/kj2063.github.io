/* eslint-disable */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

/* ssr config 인 gatsby-ssr.js 와 상태 맞춰주기 */

import React, { useEffect } from 'react';
import Layout from '@src/components/layout';
import { ThemeProvider } from '@src/context/ThemeContext';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

export const wrapPageElement = ({ element, props }) => {
  const ScrollToTop = ({ children }) => {
    const { pathname } = props.location;

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return children;
  };

  return (
    <ScrollToTop>
      <Layout>{element}</Layout>
    </ScrollToTop>
  );
};

export const onRouteUpdate = ({ location }) => {
  /* url 마지막 '/' 제거 */
  if (location.pathname.endsWith('/') && location.pathname !== '/') {
    const trimmedPath = location.pathname.slice(0, -1);
    window.history.replaceState({}, '', trimmedPath);
  }
};
