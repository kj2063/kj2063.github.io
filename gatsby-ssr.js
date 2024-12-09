/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

import React, { useEffect} from 'react';
import Layout from "@src/components/layout";

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
