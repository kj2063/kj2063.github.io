import * as React from "react"
import Layout from "../components/layout"
import "../styles/index.css"
import {graphql, Link} from "gatsby";
import moment from "moment";
import Seo from "../components/seo";

const blog = (graphql) => {

    const blogPostNodeArr = graphql.data.allMarkdownRemark.edges;

    const postArrRender = blogPostNodeArr.map((obj) => {
        const postData = obj.node.frontmatter;
        return (
            <div className={"postDiv"} key={postData.slug}>
                <span className={"dateStyle"}>{moment(postData.date).format("YYYY.MM.DD")}&nbsp;-&nbsp;</span>
                <Link className={"titleStyle"} to={postData.slug}>{postData.title}</Link>
            </div>
        )
    })

    return(
        <Layout>
            <div>
                <h2 className={"mainColor"}>
                    Blog
                </h2>
                {postArrRender}
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