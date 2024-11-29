import * as React from "react"
import { graphql } from "gatsby";
import Layout from "../components/layout"
import "../styles/blog-templates.css"

type PostTemplateType = {
  path : string;
  data : PostTemplateDataType;
}

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

const postTemplate = ({ path, data } : PostTemplateType) => {
    const blog = data.markdownRemark;

    return (
        <Layout>
        <div>
            <h2 className={"mainColor"}>
                Blog
            </h2>
            <div>
                <h1 className={"mgl30"} style={{fontWeight:'lighter',marginTop:'30px'}}>{blog.frontmatter.title}</h1>
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