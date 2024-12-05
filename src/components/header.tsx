import * as React from "react"
import { Link } from "gatsby"
import ThemeContext from "@src/context/ThemeContext";

type HeaderType = {
    siteTitle : string;
}

const Header = ({ siteTitle } : HeaderType) => (
    <ThemeContext.Consumer>
        {theme => (
            <div>
              <header
                style={{
                  margin: `0 auto`,
                  padding: `var(--space-4) var(--size-gutter)`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                }}
              >
                <Link
                  to="/"
                  className={"main_a mainColor"}
                  style={{
                    fontSize: `var(--font-md)`,
                    textDecoration: `none`,
                      fontWeight:'lighter',
                      textDecorationLine:"underline"
                  }}
                >
                    <b>{siteTitle}</b>
                </Link>
                <div>
                    <Link
                        to="/blog"
                        className={"main_a mainColor"}
                        style={{
                            fontSize: `var(--font-sm)`,
                            textDecoration: `none`,
                        }}
                    >
                        Blog
                    </Link>
                    &nbsp;&nbsp;
                    <Link
                        to="/about"
                        className={"main_a mainColor"}
                        style={{
                            fontSize: `var(--font-sm)`,
                            textDecoration: `none`,
                        }}
                    >
                        About
                    </Link>
                    &nbsp;&nbsp;
                    <button className="dark-switcher" onClick={theme.toggleDark}>
                        {theme.dark ? <b>☀</b> : <b>☾</b>}
                    </button>
                </div>
              </header>
            </div>
        )}
    </ThemeContext.Consumer>
)

export default Header
