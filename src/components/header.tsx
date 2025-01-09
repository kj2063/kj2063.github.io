import * as React from 'react';
import { Link } from 'gatsby';
import { useThemeContext } from '@src/context/ThemeContext';
import { StaticImage } from 'gatsby-plugin-image';

type HeaderType = {
    siteTitle : string;
}

const Header = ({ siteTitle } : HeaderType) => {
  const { dark } = useThemeContext();

  return (
    <div>
      <header
        style={{
          margin: '0 auto',
          padding: 'var(--space-4) var(--size-gutter)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/"
          className="main_a mainColor"
          style={{
            fontSize: 'var(--font-md)',
            textDecoration: 'none',
            fontWeight: 'lighter',
            textDecorationLine: 'underline',
          }}
        >
          <b>{siteTitle}</b>
        </Link>
        <div>
          <Link
            to="/blog"
            className="main_a mainColor"
            style={{
              fontSize: 'var(--font-sm)',
              textDecoration: 'none',
            }}
          >
            Blog
          </Link>
                  &ensp;
          <Link
            to="/about"
            className="main_a mainColor"
            style={{
              fontSize: 'var(--font-sm)',
              textDecoration: 'none',
            }}
          >
            About
          </Link>
                  &emsp;
          <a href="https://github.com/kj2063">
            {dark
              ? (
                <StaticImage
                  key="white-github-icon"
                  src="../images/white-github-icon.svg"
                  width={30}
                  alt=""
                />
              )
              : (
                <StaticImage
                  key="black-github-icon"
                  src="../images/black-github-icon.svg"
                  width={30}
                  alt=""
                />
              )}
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
