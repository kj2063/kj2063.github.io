/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import ThemeContext from "../context/ThemeContext";

const Layout = ({ children }) => {
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
              <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
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
                    marginTop: `var(--space-5)`,
                    fontSize: `var(--font-sm)`,
                  }}
                >
                  © 2022 &middot; Built by
                  {` `}
                  <a href="https://www.gatsbyjs.com">Gatsby</a>
                </footer>
              </div>
          </div>
        )}
    </ThemeContext.Consumer>
  )
}

export default Layout
