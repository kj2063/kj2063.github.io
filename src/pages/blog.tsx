import * as React from "react"
import "@src/styles/index.css"
import "@src/styles/blog.css"
import {graphql, Link} from "gatsby";
import moment from "moment";
import Seo from "@src/components/seo";
import { Input, Tag } from 'antd';
import { useState } from "react";
/* type */
type BlogFrontmatterType = {
    date : string;
    slug : string;
    title : string;
    category: string;
}

type BlogFrontmatterNodeType = {
    frontmatter: BlogFrontmatterType;
}

type BlogPostNodeType = {
    node: BlogFrontmatterNodeType;
}

const { Search } = Input;

const blog = (graphql : any) => {

    const blogPostNodeArr = graphql.data.allMarkdownRemark.edges;
    const [filteredPosts, setFilteredPosts] = useState(blogPostNodeArr);

    const onSearch = (value: string, e?:  React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
        const lowerCaseValue = value.toLowerCase();
        const filtered = blogPostNodeArr.filter((obj:BlogPostNodeType) => {
            const postData = obj.node.frontmatter;

            return (
                postData.title.toLowerCase().includes(lowerCaseValue) ||
                postData.category.toLowerCase().includes(lowerCaseValue)
            );
        });
        setFilteredPosts(filtered);
    }

    const postArrRender = filteredPosts.map((obj:BlogPostNodeType) => {
        const postData = obj.node.frontmatter;

        const categoryData = postData.category
                            .split(",")
                            .map(category => category.trim().toUpperCase())
                            .sort();

        const CategoryArrRender = categoryData.map((category:string) => {
            return (
                <Tag>{category}</Tag>
            )
        })

        return (
            <tr className={"postDiv"} key={postData.slug}>
                <td className={"dateStyle mgl30"}>{moment(postData.date).format("YYYY.MM.DD")}</td>
                <td>
                    <Link className={"titleStyle"} to={postData.slug}>{postData.title}</Link>
                </td>
                <td>
                    {CategoryArrRender}
                </td>
            </tr>
        )
    })

    return(
        <div>
            <div className="flexWarp">
                <div>
                    <h2 className={"mainColor"}>
                        Blog
                    </h2>
                </div>
                <div className="gridAlignCenter">
                    <Search placeholder="글/태그 검색" allowClear onSearch={onSearch} style={{ width: 200 }}/>
                </div>
            </div>
            <table className="blogTable">
                <tbody>
                    {postArrRender}
                </tbody>
            </table>
        </div>
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
                category
            }
          }
        }
      }
    }
`;

export const Head = () => <Seo title="Blog" />

export default blog;