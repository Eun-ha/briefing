"use client";

import { useNews, useWeather, useTraffic } from "../hooks/useBriefing";

interface ErrorFallbackProps {
  onRetry: () => void;
}

export function ErrorFallback({ onRetry }: ErrorFallbackProps) {
  const newsQuery = useNews();
  const weatherQuery = useWeather();
  const trafficQuery = useTraffic();

  const hasAnyError = newsQuery.error || weatherQuery.error || trafficQuery.error;

  if (!hasAnyError || (newsQuery.data || weatherQuery.data || trafficQuery.data)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-14 sm:px-10">
        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <h1 className="text-3xl font-semibold">오늘의 Briefing</h1>
          <p className="mt-3 text-red-600 dark:text-red-400">
            데이터를 불러오는데 실패했습니다
          </p>
          <div className="mt-4 space-y-2">
            {newsQuery.error && (
              <p className="text-sm text-red-500">• 뉴스: {newsQuery.error.message}</p>
            )}
            {weatherQuery.error && (
              <p className="text-sm text-red-500">• 날씨: {weatherQuery.error.message}</p>
            )}
            {trafficQuery.error && (
              <p className="text-sm text-red-500">• 교통: {trafficQuery.error.message}</p>
            )}
          </div>
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            다시 시도
          </button>
        </section>
      </main>
    </div>
  );
}