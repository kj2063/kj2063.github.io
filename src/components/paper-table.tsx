import React, { useEffect, useState } from 'react';
import '@src/styles/paper-table.css';

type paperType = {
  title: string | null;
  link: string | null;
  summary: string | null;
}

const PaperTable = () => {
  const [papers, setPapers] = useState<paperType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPapers = () => {
      setLoading(true);

      fetch('https://export.arxiv.org/api/query?search_query=cat:cs.CV&sortBy=submittedDate&sortOrder=descending&max_results=10')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          const data = new window.DOMParser().parseFromString(text, 'text/xml');
          const entries = Array.from(data.getElementsByTagName('entry'));

          const results = entries.map((entry) => ({
            title: entry.getElementsByTagName('title')[0].textContent,
            link: entry.getElementsByTagName('id')[0].textContent,
            summary: entry.getElementsByTagName('summary')[0].textContent,
          }));

          setPapers(results);
        })
        .catch(() => {
          setPapers([]);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchPapers();
  }, []);

  const articleRender = () => (
    papers && papers.length > 0
      ? papers.map((paper, index) => (
        <tr key={`paper-table-tr${index}`}>
          <td key={`paper-table-td${index}`}>
            <a href={paper.link as string} target="_blank" rel="noopener noreferrer">
              -
              {' '}
              {paper.title}
            </a>
          </td>
        </tr>
      ))
      : (
        <tr>
          <td>최신 논문이 없습니다.</td>
        </tr>
      )
  );

  return (
    <div>
      <table key="paper-table" className="paper-table">
        <thead>
          <tr>
            <th>
              📝&nbsp;
              <a href="https://arxiv.org/list/cs.CV/recent?skip=50&show=50">Computer Vision 관련 최신 논문</a>
            </th>
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

export default PaperTable;
