/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../styles/layout.css"
import ThemeContext from "../context/ThemeContext";

type LayoutType = {
  children : React.ReactNode;
}

const Layout = ({ children } : LayoutType) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeContext.Consumer>
        {theme => (
          <div className={theme.dark ? 'dark' : 'light'}>
              <Header siteTitle={data.site.siteMetadata?.title} />
              <div
                style={{
                  margin: `0 auto`,
                  maxWidth: `var(--size-content)`,
                  padding: `var(--size-gutter)`,
                }}
              >
                <main>{children}</main>
                <footer
                  style={{
                    marginTop: "100px",
                    fontSize: `var(--font-sm)`,
                    color:"var(--color-secondary)"
                  }}
                >
                  © 2022 by {data.site.siteMetadata?.title}
                </footer>
              </div>
          </div>
        )}
    </ThemeContext.Consumer>
  )
}

export default Layout
