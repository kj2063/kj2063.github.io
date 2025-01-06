/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/* csr config 인 gatsby-browser.js 와 상태 맞춰주기 */

import React, { useEffect} from 'react';
import Layout from "@src/components/layout";
import { ThemeProvider } from "@src/context/ThemeContext"

export const wrapRootElement = ({ element }) => {
    return (
        <ThemeProvider>{element}</ThemeProvider>
    )
}

export const wrapPageElement = ({ element, props }) => {
  const ScrollToTop = ({ children }) => {
      const pathname = props.location.pathname;

      useEffect(() => {
          window.scrollTo(0, 0);
      }, [pathname]);

      return children;
  };

  return (
      <ScrollToTop children={
          <Layout>{element}</Layout>
      }/>
  )
};
