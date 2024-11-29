import * as React from "react"
import Layout from "../components/layout"
import "../styles/index.css"
import "../styles/blog.css"
import {graphql, Link} from "gatsby";
import moment from "moment";
import Seo from "../components/seo";

type BlogFrontmatterType = {
    date : string;
    slug : string;
    title : string;
}

type BlogFrontmatterNodeType = {
    frontmatter: BlogFrontmatterType;
}

type BlogPostNodeType = {
    node: BlogFrontmatterNodeType;
}

const blog = (graphql : any) => {

    const blogPostNodeArr = graphql.data.allMarkdownRemark.edges;

    const postArrRender = blogPostNodeArr.map((obj:BlogPostNodeType) => {
        const postData = obj.node.frontmatter;
        return (
            <tr className={"postDiv"} key={postData.slug}>
                <td className={"dateStyle mgl30"}>{moment(postData.date).format("YYYY.MM.DD")}</td>
                <td>
                    <Link className={"titleStyle"} to={postData.slug}>{postData.title}</Link>
                </td>
            </tr>
        )
    })

    return(
        <Layout>
            <div>
                <h2 className={"mainColor"}>
                    Blog
                </h2>
                <table className="blogTable">
                    <tbody>
                        {postArrRender}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}


export const query = graphql`
  query {
      allMarkdownRemark (sort: {fields:frontmatter___date,order:DESC}){ 
        edges {
          node {
            html
            frontmatter{
                title
                slug
                date
            }
          }
        }
      }
    }
`;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default blog;