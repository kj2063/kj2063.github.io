import * as React from 'react';
import Seo from '@src/components/seo';

const NotFoundPage = () => (
  <div>
    <h2 className="mainColor">404: Not Found</h2>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
);

export const Head = () => (
  <Seo
    title="404: Not Found"
    description="요청한 페이지를 찾을 수 없습니다."
    pathname="/404"
    noIndex
  />
);

export default NotFoundPage;
