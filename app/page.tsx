import { NewsSection } from "./components/NewsSection";
import { WeatherSection } from "./components/WeatherSection";
import { TrafficSection } from "./components/TrafficSection";
import type { NewsResult } from "./services/newsService";
import type { WeatherResult } from "./services/weatherService";

interface BriefingData {
  news: NewsResult | null;
  weather: WeatherResult | null;
}

interface ApiResponse {
  success: boolean;
  data: BriefingData;
  message?: string;
}

async function getBriefingData(): Promise<BriefingData> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/briefing`, {
    cache: 'no-store', // SSR을 위해 캐시 비활성화
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const result: ApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "API 응답이 실패했습니다");
  }

  return result.data;
}

export default async function Home() {
  const { news, weather } = await getBriefingData();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-14 sm:px-10">
        <section className="rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <h1 className="text-3xl font-semibold">오늘의 Briefing</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            News, Weather, Kakao Map 정보를 서버에서 받아와 렌더링합니다.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <NewsSection news={news} />
          <WeatherSection weather={weather} />
          <TrafficSection />
        </section>
      </main>
    </div>
  );
}
