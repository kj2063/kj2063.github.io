import * as React from "react"
import "@src/styles/index.css"
import "@src/styles/blog.css"
import {graphql, Link} from "gatsby";
import moment from "moment";
import Seo from "@src/components/seo";
import { Input, Tag } from 'antd';
import { useEffect, useState } from "react";
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

    const [firstColumnWidth, setFirstColumnWidth] = useState("80px");
    const [thirdColumnWidth, setThirdColumnWidth] = useState("80px");
    

    useEffect(() => {
        const handleResize = () => {
          // 브라우저 크기에 따라 열 너비를 동적으로 계산
          const newFirstColumnWidth = Math.min(Math.max(window.innerWidth * 0.1, 80), 120);
          const newThirdColumnWidth = Math.min(Math.max(window.innerWidth * 0.15, 80), 210);
          
          setFirstColumnWidth(`${newFirstColumnWidth}px`);
          setThirdColumnWidth(`${newThirdColumnWidth}px`);
        };
    
        // 초기 계산 및 리사이즈 이벤트 리스너 추가
        handleResize();
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                <td className={"dateStyle"} style={{width : firstColumnWidth}}>{moment(postData.date).format("YYYY.MM.DD")}</td>
                <td>
                    <Link className={"titleStyle"} to={postData.slug}>{postData.title}</Link>
                </td>
                <td style={{width : thirdColumnWidth}}>
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