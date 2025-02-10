import * as React from 'react';
import Seo from '@src/components/seo';
import Roulette from '@src/components/roulette';
import NewsTable from '@src/components/news-table';
import PaperTable from '@src/components/paper-table';
import '@src/styles/common.css';
import '@src/styles/index.css';

const IndexPage = () => (
  <div>
    <h2 className="mainColor">
      Home
    </h2>
    <div className="textCenter">
      <Roulette />
      <br />
      <br />
      <NewsTable />
      <br />
      <br />
      <PaperTable />
    </div>
  </div>
);
export const Head = () => <Seo title="Home" />;

export default IndexPage;
