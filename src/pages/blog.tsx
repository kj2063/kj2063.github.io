import * as React from 'react';
import { graphql, Link } from 'gatsby';
import moment from 'moment';
import Seo from '@src/components/seo';
import {
  Input, Tag, Button,
} from 'antd';
import { useEffect, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import '@src/styles/index.css';
import '@src/styles/blog.css';

/* type */
type BlogFrontmatterType = {
    date : string;
    title : string;
    category: string;
}

type BlogFrontmatterNodeType = {
    fields: {
      slug: string;
    };
    frontmatter: BlogFrontmatterType;
}

type BlogPostNodeType = {
    node: BlogFrontmatterNodeType;
}

type tagListType = {
  tagName : string;
  tagCnt : number;
}

const { Search } = Input;

const blog = (queryResult : any) => {
  const blogPostNodeArr = queryResult.data.allMarkdownRemark.edges;
  const [filteredPosts, setFilteredPosts] = useState(blogPostNodeArr);

  const [tagList, setTagList] = useState<tagListType[]>([]);

  const [firstColumnWidth, setFirstColumnWidth] = useState<string>('80px');
  const [thirdColumnWidth, setThirdColumnWidth] = useState<string>('80px');

  /* useEffect : 블로그 테이블 칼럼사이즈 동적변환 */
  useEffect(() => {
    const handleResize = () => {
      // 브라우저 크기에 따라 열 너비를 동적으로 계산
      const newFirstColumnWidth = Math.min(Math.max(window.innerWidth * 0.1, 75), 120);
      const newThirdColumnWidth = Math.min(Math.max(window.innerWidth * 0.125, 50), 215);

      setFirstColumnWidth(`${newFirstColumnWidth}px`);
      setThirdColumnWidth(`${newThirdColumnWidth}px`);
    };

    // 초기 계산 및 리사이즈 이벤트 리스너 추가
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* useEffect : 블로그 글 전체 태그정보 수집 */
  useEffect(() => {
    let tagListObj :tagListType[] = [];
    const temptagListObj1 : tagListType[] = [];
    const tempTagListObj2 : tagListType[] = [];
    temptagListObj1.push({ tagName: 'ALL', tagCnt: 0 });

    blogPostNodeArr
      .map((obj:BlogPostNodeType) => obj.node.frontmatter.category.split(',').map((blogCategory:string) => blogCategory.trim().toUpperCase()))
      .forEach((blogCategoryList:string[]) => {
        temptagListObj1[0].tagCnt += 1;

        blogCategoryList.forEach((blogCategory:string) => {
          const tagObj = tempTagListObj2.find((item: tagListType) => item.tagName === blogCategory);

          if (tagObj) {
            tagObj.tagCnt += 1;
          } else {
            const newTagObj : tagListType = { tagName: blogCategory, tagCnt: 1 };
            tempTagListObj2.push(newTagObj);
          }
        });
      });

    tempTagListObj2.sort((a, b) => {
      if (a.tagName < b.tagName) return -1;
      if (a.tagName > b.tagName) return 1;
      return 0;
    });

    tagListObj = temptagListObj1.concat(tempTagListObj2);

    setTagList(tagListObj);
  }, []);

  /* 블로그 글 제목/태그 검색 */
  const onSearch = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const filtered = blogPostNodeArr.filter((obj:BlogPostNodeType) => {
      const postData = obj.node.frontmatter;

      return (
        postData.title.toLowerCase().includes(lowerCaseValue)
                || postData.category.toLowerCase().includes(lowerCaseValue)
      );
    });
    setFilteredPosts(filtered);
  };

  /* TagListArr Render */
  const tagListArrRender = () => {
    const onSearchTagName = (tagName: string) => {
      let searchTagName = '';

      if (tagName !== 'ALL') {
        searchTagName = tagName;
      }

      onSearch(searchTagName);
    };

    const tagListRender = tagList.map((obj:tagListType, idx:number) => (
      <Button className="tagListButton" variant="outlined" size="small" key={idx} onClick={() => { onSearchTagName(`${obj.tagName}`); }}>{`${obj.tagName} (${obj.tagCnt})`}</Button>
    ));

    return tagListRender;
  };

  /* PostArr Render */
  const postArrRender = filteredPosts.map((obj:BlogPostNodeType) => {
    const postData = obj.node.frontmatter;
    const postSlug = obj.node.fields.slug;

    const categoryData = postData.category
      .split(',')
      .map((category) => category.trim().toUpperCase())
      .sort();

    const CategoryArrRender = categoryData.map((category:string, idx:number) => (
      <Tag className="categoryTag" key={idx}>{category}</Tag>
    ));

    return (
      <tr className="postDiv" key={postSlug}>
        <td className="dateStyle" key={`${postSlug}_firstColumn`} style={{ width: firstColumnWidth }}>{moment(postData.date).format('YYYY.MM.DD')}</td>
        <td>
          <Link className="titleStyle" key={`${postSlug}_secondColumn`} to={postSlug}>{postData.title}</Link>
        </td>
        <td key={`${postSlug}_thirdColumn`} style={{ width: thirdColumnWidth }}>
          {CategoryArrRender}
        </td>
      </tr>
    );
  });

  return (
    <div className="blogPage">
      <section className="blogHeader">
        <div className="blogTitleBlock">
          <h2 className="mainColor blogTitle">
            Blog
          </h2>
        </div>
        <div className="blogSearchArea">
          <Search className="blogSearchInput" placeholder="글/태그 검색" allowClear onSearch={onSearch} />
        </div>
      </section>
      <section className="blogFilterPanel" aria-label="Blog filters">
        <div className="blogFilterHeader">
          <span className="blogFilterTitle">
            <StaticImage
              key="tag-icon"
              src="../images/tag-icon.svg"
              width={24}
              alt=""
            />
            Tag List
          </span>
        </div>
        <div className="blogTagList">
          {tagListArrRender()}
        </div>
      </section>
      <div className="blogListWrap">
        <table className="blogTable">
          <tbody>
            {postArrRender}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const query = graphql`
  query {
      allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter{
                title
                date
                category
            }
          }
        }
      }
    }
`;

export const Head = () => (
  <Seo
    title="Blog"
    description="AI, 데이터 분석, 컴퓨터공학, 웹 개발 글을 모아둔 Jun's Blog 글 목록입니다."
    pathname="/blog"
    keywords={['AI', 'Data Analysis', 'Computer Science', 'Web Development']}
  />
);

export default blog;
