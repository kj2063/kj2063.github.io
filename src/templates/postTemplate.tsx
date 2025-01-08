/*
import '@src/styles/blog-templates.css';
*/

import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Seo from '@src/components/seo';

type PostTemplateFrontmatterType = {
  title : string;
}

type PostTemplateMarkdownRemarkType = {
  frontmatter: PostTemplateFrontmatterType;
  html: string;
}

type PostTemplateDataType = {
  markdownRemark : PostTemplateMarkdownRemarkType
}

type PostTemplateType = {
  path : string;
  data : PostTemplateDataType;
}

// eslint-disable-next-line no-unused-vars
const postTemplate = ({ path, data } : PostTemplateType) => {
  const blog = data.markdownRemark;

  return (
    <div>
      <h2 className="mainColor">
        Blog
      </h2>
      <div>
        <h1 className="mgl30" style={{ fontWeight: 'lighter', marginTop: '30px' }}>{blog.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: blog.html }} />
      </div>
      <Link
        to="/blog"
        className="main_a mainColor"
        style={{
          fontSize: 'var(--font-sm)',
          textDecoration: 'none',
        }}
      >
        <b>➯ to list of blog posts</b>
      </Link>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export const Head = ({ data }: { data: any }) => {
  const { title } = data.markdownRemark.frontmatter;
  return <Seo title={title} />;
};

export default postTemplate;
