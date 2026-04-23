import type { NewsResult } from "../services/newsService";

interface NewsSectionProps {
  news: NewsResult | null;
}

export function NewsSection({ news }: NewsSectionProps) {
  const topArticle = news?.headlines?.[0];

  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">뉴스 헤드라인</h2>
      </div>
      {topArticle ? (
        <div className="mt-4 space-y-3">
          <p className="text-lg font-medium">{topArticle.title}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            카테고리: {news?.category}
          </p>
          <a
            href={topArticle.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
          >
            기사 보기
          </a>
        </div>
      ) : (
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">뉴스 기사를 불러오지 못했습니다.</p>
      )}
    </article>
  );
}