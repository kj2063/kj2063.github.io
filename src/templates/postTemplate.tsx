import * as React from "react"
import { graphql } from "gatsby";
import "@src/styles/blog-templates.css"
import Seo from "@src/components/seo";

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
        <div>
            <h2 className={"mainColor"}>
                Blog
            </h2>
            <div>
                <h1 className={"mgl30"} style={{fontWeight:'lighter',marginTop:'30px'}}>{blog.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: blog.html }} />
            </div>
        </div>
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

export const Head = ({ data }: { data: any }) => {
  const title = data.markdownRemark.frontmatter.title;
  return <Seo title={title} />;
}

export default postTemplate;