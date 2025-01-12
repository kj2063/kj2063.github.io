import * as React from 'react';
import Seo from '@src/components/seo';
import '@src/styles/common.css';
import '@src/styles/index.css';

const IndexPage = () => (
  <div>
    <h2 className="mainColor">
      Home
    </h2>
    <div className="textCenter">
      <br />
      <br />
      <h3>Jun's 블로그에 오신것을 환영합니다!</h3>
      <br />
      <b>현재 Home은 개발중에 있습니다.</b>
      <br />
      <br />
      <br />
    </div>
  </div>
);

export const Head = () => <Seo title="Home" />;

export default IndexPage;
