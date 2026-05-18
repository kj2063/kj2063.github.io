import * as React from 'react';
import Seo from '@src/components/seo';
import CuratedAiNews from '@src/components/curated-ai-news';

const IndexPage = () => (
  <div>
    <h2 className="mainColor">
      Home
    </h2>
    <CuratedAiNews />
  </div>
);
export const Head = () => <Seo title="Home" />;

export default IndexPage;
