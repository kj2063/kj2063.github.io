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
export const Head = () => (
  <Seo
    title="Home"
    description="AI 뉴스와 기술 글을 정리하는 Jun's Blog 홈입니다."
    pathname="/"
  />
);

export default IndexPage;
