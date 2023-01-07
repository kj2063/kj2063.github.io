import * as React from "react"
import { graphql } from "gatsby";
import Layout from "../components/layout"

const postTemplate = ({ path, data }) => {
    const blog = data.markdownRemark;

    return (
        <Layout>
        <div>
            <h1>
                <b>Blog</b>
            </h1>
            <div>
                <h1>{blog.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: blog.html }} />
            </div>
        </div>
        </Layout>
    );
}

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

export default postTemplate;