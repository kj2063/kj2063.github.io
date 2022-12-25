import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/index.css"
import {graphql} from "gatsby";
import moment from "moment";
import {LineOutlined} from "@ant-design/icons";

const IndexPage = (graphql) => {

    const blogPostNodeArr = graphql.data.allMarkdownRemark.edges;

    const postArrRender = [];

    blogPostNodeArr.forEach((obj)=> {
        const postData = obj.node.frontmatter;
        postArrRender.push(
            <div className={"postDiv"}>
                <a className={"titleStyle"} href={postData.slug}>{postData.title}</a>
                <span className={"dateStyle"}> - {moment(postData.date).format("YYYY.MM.DD")}</span>
            </div>
        )
    })

    return(
      <Layout>
        <div>
          <h1>
           <b>Blog</b>
          </h1>
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

export default IndexPage
