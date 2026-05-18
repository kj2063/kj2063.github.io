import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputPath = new URL('../src/data/generated/curated-ai-news.json', import.meta.url);

const KEYWORDS = [
  ['agent', 5],
  ['agents', 5],
  ['artificial intelligence', 5],
  ['ai', 4],
  ['llm', 4],
  ['large language model', 4],
  ['foundation model', 4],
  ['multimodal', 4],
  ['reasoning', 4],
  ['benchmark', 3],
  ['evaluation', 3],
  ['safety', 3],
  ['alignment', 3],
  ['open source', 3],
  ['inference', 3],
  ['training', 3],
  ['transformer', 3],
  ['diffusion', 3],
  ['robotics', 2],
  ['computer vision', 2],
  ['nlp', 2],
  ['machine learning', 2],
];

const FALLBACK_ITEMS = [
  {
    title: 'arXiv AI recent papers',
    url: 'https://arxiv.org/list/cs.AI/recent',
    source: 'arXiv',
    type: 'paper',
    publishedAt: new Date().toISOString(),
    summary: 'Recent artificial intelligence papers from arXiv.',
    reason: 'Fallback source kept so the feed remains valid when live sources are unavailable.',
    score: 1,
  },
  {
    title: 'Hacker News technology discussions',
    url: 'https://news.ycombinator.com/',
    source: 'Hacker News',
    type: 'discussion',
    publishedAt: new Date().toISOString(),
    summary: 'Current technology discussions from Hacker News.',
    reason: 'Fallback source kept so the feed remains valid when live sources are unavailable.',
    score: 1,
  },
  {
    title: 'Google AI updates',
    url: 'https://blog.google/technology/ai/',
    source: 'Google Blog',
    type: 'news',
    publishedAt: new Date().toISOString(),
    summary: 'Official AI updates from Google.',
    reason: 'Fallback source kept so the feed remains valid when live sources are unavailable.',
    score: 1,
  },
];

const FEEDS = [
  {
    source: 'AWS Machine Learning Blog',
    type: 'news',
    url: 'https://aws.amazon.com/blogs/machine-learning/feed/',
  },
  {
    source: 'AWS News Blog',
    type: 'news',
    url: 'https://aws.amazon.com/blogs/aws/feed/',
  },
  {
    source: 'GitHub AI & ML Blog',
    type: 'news',
    url: 'https://github.blog/ai-and-ml/feed/',
  },
  {
    source: 'GitHub Blog',
    type: 'news',
    url: 'https://github.blog/feed/',
  },
  {
    source: 'Google Research Blog',
    type: 'research',
    url: 'https://research.google/blog/rss/',
  },
  {
    source: 'Google Blog',
    type: 'news',
    url: 'https://blog.google/rss/',
  },
  {
    source: 'OpenAI Developers',
    type: 'news',
    url: 'https://developers.openai.com/rss.xml',
  },
  {
    source: 'NVIDIA Blog',
    type: 'news',
    url: 'https://blogs.nvidia.com/feed/',
  },
];

const ARXIV_URL = 'https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.CL+OR+cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=20';
const HN_TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const REQUEST_TIMEOUT_MS = 15000;
const FEATURED_SOURCES = [
  'arXiv',
  'Hacker News',
  'AWS Machine Learning Blog',
  'GitHub AI & ML Blog',
  'Google Research Blog',
];

const decodeXml = (value = '') => value
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
  .replace(/&#x([a-f0-9]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
  .replace(/\s+/g, ' ')
  .trim();

const stripHtml = (value = '') => decodeXml(value.replace(/<[^>]+>/g, ' '));

const getTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? stripHtml(match[1]) : '';
};

const getLink = (xml) => {
  const hrefMatch = xml.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  if (hrefMatch) {
    return decodeXml(hrefMatch[1]);
  }

  return getTag(xml, 'link');
};

const parseEntries = (xml) => {
  const atomEntries = [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => match[0]);
  if (atomEntries.length > 0) {
    return atomEntries;
  }

  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0]);
};

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const fetchText = async (url) => {
  const response = await fetchWithTimeout(url, {
    headers: {
      'user-agent': 'kj2063.github.io feed updater (https://github.com/kj2063/kj2063.github.io)',
      accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
    },
  });

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.text();
};

const fetchJson = async (url) => {
  const response = await fetchWithTimeout(url, {
    headers: {
      'user-agent': 'kj2063.github.io feed updater (https://github.com/kj2063/kj2063.github.io)',
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.json();
};

const normalizeUrl = (url) => {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    parsed.searchParams.delete('utm_source');
    parsed.searchParams.delete('utm_medium');
    parsed.searchParams.delete('utm_campaign');
    parsed.searchParams.delete('utm_term');
    parsed.searchParams.delete('utm_content');
    return parsed.toString();
  } catch {
    return url;
  }
};

const keywordScore = (item) => {
  const text = `${item.title} ${item.summary}`.toLowerCase();
  return KEYWORDS.reduce((score, [keyword, weight]) => (
    text.includes(keyword) ? score + weight : score
  ), 0);
};

const makeReason = (item) => {
  const matched = KEYWORDS
    .filter(([keyword]) => `${item.title} ${item.summary}`.toLowerCase().includes(keyword))
    .slice(0, 3)
    .map(([keyword]) => keyword);

  if (matched.length === 0) {
    return `Recent AI-related item from ${item.source}.`;
  }

  return `Selected for strong relevance to: ${matched.join(', ')}.`;
};

const normalizeItem = (item) => {
  const publishedAt = item.publishedAt ? new Date(item.publishedAt) : new Date();
  const safePublishedAt = Number.isNaN(publishedAt.getTime()) ? new Date() : publishedAt;
  const normalized = {
    title: decodeXml(item.title || '').trim(),
    url: normalizeUrl(item.url || ''),
    source: item.source,
    type: item.type,
    publishedAt: safePublishedAt.toISOString(),
    summary: stripHtml(item.summary || '').slice(0, 280),
  };
  const score = keywordScore(normalized) + (item.score || 0);

  return {
    ...normalized,
    reason: makeReason(normalized),
    score,
  };
};

const fetchArxiv = async () => {
  const xml = await fetchText(ARXIV_URL);
  return parseEntries(xml).map((entry) => normalizeItem({
    title: getTag(entry, 'title'),
    url: getTag(entry, 'id') || getLink(entry),
    source: 'arXiv',
    type: 'paper',
    publishedAt: getTag(entry, 'published') || getTag(entry, 'updated'),
    summary: getTag(entry, 'summary'),
    score: 2,
  }));
};

const fetchHackerNews = async () => {
  const storyIds = await fetchJson(HN_TOP_STORIES_URL);
  if (!Array.isArray(storyIds)) {
    return [];
  }

  const stories = await Promise.allSettled(
    storyIds.slice(0, 60).map((id) => fetchJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)),
  );

  return stories
    .filter((result) => result.status === 'fulfilled' && result.value && !result.value.deleted && !result.value.dead)
    .map((result) => result.value)
    .map((story) => normalizeItem({
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      source: 'Hacker News',
      type: 'discussion',
      publishedAt: new Date(story.time * 1000).toISOString(),
      summary: story.text || `${story.score || 0} points and ${story.descendants || 0} comments on Hacker News.`,
      score: Math.min(Math.floor((story.score || 0) / 50), 8),
    }));
};

const fetchOfficialFeeds = async () => {
  const feedResults = await Promise.allSettled(FEEDS.map(async (feed) => {
    const xml = await fetchText(feed.url);
    return parseEntries(xml).slice(0, 12).map((entry) => normalizeItem({
      title: getTag(entry, 'title'),
      url: getLink(entry) || getTag(entry, 'guid'),
      source: feed.source,
      type: feed.type,
      publishedAt: getTag(entry, 'published') || getTag(entry, 'updated') || getTag(entry, 'pubDate'),
      summary: getTag(entry, 'summary') || getTag(entry, 'description') || getTag(entry, 'content'),
      score: 1,
    }));
  }));

  return feedResults
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value);
};

const curate = (items) => {
  const seenUrls = new Set();
  const ranked = items
    .filter((item) => item.title && item.url && item.source && item.type && item.publishedAt)
    .filter((item) => {
      const score = keywordScore(item);
      return score > 0 || item.source === 'arXiv';
    })
    .map((item) => ({
      ...item,
      score: item.score || keywordScore(item),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .filter((item) => {
      const url = normalizeUrl(item.url);
      if (seenUrls.has(url)) {
        return false;
      }
      seenUrls.add(url);
      return true;
    });

  const selected = [];
  const selectedUrls = new Set();

  FEATURED_SOURCES.forEach((source) => {
    const sourcePick = ranked.find((item) => item.source === source && !selectedUrls.has(item.url));
    if (sourcePick) {
      selected.push(sourcePick);
      selectedUrls.add(sourcePick.url);
    }
  });

  ranked.forEach((item) => {
    if (selected.length >= 12 || selectedUrls.has(item.url)) {
      return;
    }

    selected.push(item);
    selectedUrls.add(item.url);
  });

  return selected.slice(0, 12);
};

const readExistingFeed = async () => {
  try {
    const content = await readFile(outputPath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
};

const getExistingItems = (feed) => (
  feed && Array.isArray(feed.items) && feed.items.length > 0 ? feed.items : null
);

const writeFeed = async (items, status = 'ok') => {
  const feed = {
    updatedAt: new Date().toISOString(),
    status,
    count: items.length,
    items,
  };

  await mkdir(dirname(fileURLToPath(outputPath)), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(feed, null, 2)}\n`, 'utf8');
  return feed;
};

const main = async () => {
  const results = await Promise.allSettled([
    fetchArxiv(),
    fetchHackerNews(),
    fetchOfficialFeeds(),
  ]);

  const items = results
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value);
  const curated = curate(items);

  if (curated.length > 0) {
    const feed = await writeFeed(curated);
    console.log(`Wrote ${feed.count} curated AI feed items to ${fileURLToPath(outputPath)}`);
    return;
  }

  const existingFeed = await readExistingFeed();
  const existingItems = getExistingItems(existingFeed);
  if (existingItems) {
    const feed = await writeFeed(existingItems, existingFeed.status || 'cached');
    console.log(`No live feed items collected. Reused ${feed.count} existing items in ${fileURLToPath(outputPath)}`);
    return;
  }

  const feed = await writeFeed(FALLBACK_ITEMS, 'fallback');
  console.log(`Wrote ${feed.count} fallback AI feed items to ${fileURLToPath(outputPath)}`);
};

main().catch(async (error) => {
  const existingFeed = await readExistingFeed();
  const existingItems = getExistingItems(existingFeed);
  if (existingItems) {
    const feed = await writeFeed(existingItems, existingFeed.status || 'cached');
    console.warn(`Feed update failed. Reused ${feed.count} existing items in ${fileURLToPath(outputPath)}`);
    console.warn(error);
    return;
  }

  await writeFeed(FALLBACK_ITEMS, 'fallback');
  console.warn(`Feed update failed. Wrote fallback data to ${fileURLToPath(outputPath)}`);
  console.warn(error);
});
