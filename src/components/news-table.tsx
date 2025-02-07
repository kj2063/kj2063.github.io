import React, { useEffect, useState } from 'react';
import '@src/styles/news-table.css';

type articleType = {
    url: string;
    title: string;
}

const NewsTable = () => {
  const [articles, setArticles] = useState<articleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = process.env.GATSBY_API_KEY;

  // 날짜 계산 (현재 날짜 기준 10일 전)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 10);

  const startDateStr = startDate.toISOString().split('T')[0]; // yyyy-MM-dd
  const endDateStr = endDate.toISOString().split('T')[0]; // yyyy-MM-dd

  const url = `https://newsapi.org/v2/everything?sources=wired,cnn&q=artificial+intelligence+OR+AI&from=${startDateStr}&to=${endDateStr}&sortBy=popularity&pageSize=10&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setArticles(data.articles); // 뉴스 데이터를 상태에 저장
        setLoading(false); // 데이터 로딩 완료
      } catch (error) {
        setArticles([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 빈 배열로 두어 컴포넌트가 처음 렌더링될 때만 호출

  const articleRender = () => (
    articles && articles.length > 0
      ? articles.map((article, index) => (
        <tr key={`news-table-tr${index}`}>
          <td key={`news-table-td${index}`}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
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
