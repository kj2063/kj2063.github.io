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
      <header className="siteHeader">
        <Link
          to="/"
          className="main_a mainColor siteBrand"
          aria-label={`${siteTitle} 홈으로 이동`}
        >
          <StaticImage
            src="../images/juns-blog-logo.png"
            width={180}
            alt=""
            className="siteBrandLogo"
            placeholder="none"
            loading="eager"
          />
        </Link>
        <nav className="siteNav" aria-label="Primary navigation">
          <Link
            to="/blog"
            className="main_a mainColor siteNavLink"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="main_a mainColor siteNavLink"
          >
            About
          </Link>
          <a className="siteGithubLink" href="https://github.com/kj2063" aria-label="GitHub">
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
        </nav>
      </header>
    </div>
  );
};

export default Header;
