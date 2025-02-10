import React, { useEffect, useState } from 'react';
import '@src/styles/news-table.css';

type headlineType = {
  main : string;
}

type articleType = {
  web_url: string;
  title: string;
  abstract: string;
  headline: headlineType;
}

const NewsTable = () => {
  const [news, setNews] = useState<articleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiKey = process.env.GATSBY_NEWS_API_KEY;

    const formatDate = (date:Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    };

    const fetchNews = async () => {
      try {
        const endDate = new Date();
        const beginDate = new Date();
        beginDate.setDate(endDate.getDate() - 10);

        const endDateStr = formatDate(endDate);
        const beginDateStr = formatDate(beginDate);

        const response = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=AI OR "Artificial Intelligence"&fq=section_name:("Science","Technology")&begin_date=${beginDateStr}&end_date=${endDateStr}&sort=newest&api-key=${apiKey}`,
        );
        const data = await response.json();

        console.log(data.response.docs);

        setNews(data.response.docs);
        setLoading(false);
      } catch (error) {
        setNews([]);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const articleRender = () => (
    news && news.length > 0
      ? news.map((article, index) => (
        <tr key={`news-table-tr${index}`}>
          <td key={`news-table-td${index}`}>
            <a href={article.web_url} target="_blank" rel="noopener noreferrer">
              -
              {' '}
              {article.headline.main}
            </a>
          </td>
        </tr>
      ))
      : (
        <tr>
          <td>최신 기사가 없습니다.</td>
        </tr>
      )
  );

  return (
    <div>
      <table key="news-table" className="news-table">
        <thead>
          <tr>
            <th>📰 AI 관련 최신 뉴스</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? (
              <tr>
                <td><b>Loading...</b></td>
              </tr>
            )
            : articleRender()}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;
