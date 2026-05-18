import * as React from 'react';
import curatedAiNewsData from '@src/data/generated/curated-ai-news.json';
import '@src/styles/curated-ai-news.css';

type CuratedAiNewsItem = {
  title: string;
  url: string;
  source: string;
  type: string;
  publishedAt: string;
  summary: string;
  reason: string;
  score?: number;
}

type CuratedAiNewsFeed = {
  updatedAt: string;
  items: CuratedAiNewsItem[];
}

const isString = (value: unknown): value is string => typeof value === 'string';

const isCuratedAiNewsItem = (item: unknown): item is CuratedAiNewsItem => {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const candidate = item as Partial<CuratedAiNewsItem>;

  return (
    isString(candidate.title)
    && isString(candidate.url)
    && isString(candidate.source)
    && isString(candidate.type)
    && isString(candidate.publishedAt)
    && isString(candidate.summary)
    && isString(candidate.reason)
    && (candidate.score === undefined || typeof candidate.score === 'number')
  );
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const getFeed = (): CuratedAiNewsFeed => {
  const feed = curatedAiNewsData as unknown as Partial<CuratedAiNewsFeed>;

  return {
    updatedAt: isString(feed.updatedAt) ? feed.updatedAt : '',
    items: Array.isArray(feed.items) ? feed.items.filter(isCuratedAiNewsItem) : [],
  };
};

const CuratedAiNews = () => {
  const { updatedAt, items } = getFeed();

  return (
    <section className="curatedAiNews" aria-labelledby="curated-ai-news-title">
      <div className="curatedAiNewsHeader">
        <div>
          <p className="curatedAiNewsEyebrow">AI News</p>
          <h1 id="curated-ai-news-title">엔지니어를 위한 뉴스/논문 픽</h1>
        </div>
        {updatedAt && (
          <p className="curatedAiNewsUpdated">
            업데이트:
            {' '}
            <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
          </p>
        )}
      </div>

      {items.length > 0 ? (
        <ol className="curatedAiNewsList">
          {items.map((item) => (
            <li className="curatedAiNewsItem" key={`${item.url}-${item.title}`}>
              <article>
                <div className="curatedAiNewsMeta">
                  <span>{item.source}</span>
                  <span>{item.type}</span>
                  <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                  {typeof item.score === 'number' && (
                    <span>
                      Score
                      {' '}
                      {item.score}
                    </span>
                  )}
                </div>
                <h2>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h2>
                {item.summary && (
                  <p className="curatedAiNewsSummary">{item.summary}</p>
                )}
                {item.reason && (
                  <p className="curatedAiNewsReason">{item.reason}</p>
                )}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p className="curatedAiNewsEmpty">
          아직 표시할 뉴스/논문 픽이 없습니다.
        </p>
      )}
    </section>
  );
};

export default CuratedAiNews;
