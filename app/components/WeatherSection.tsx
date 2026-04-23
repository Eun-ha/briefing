import Image from "next/image";
import type { WeatherResult } from "../services/weatherService";

interface WeatherSectionProps {
  weather: WeatherResult | null;
}

export function WeatherSection({ weather }: WeatherSectionProps) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">날씨 정보</h2>
      </div>
      {weather ? (
        <div className="mt-4 space-y-3">
          <p className="text-lg font-medium">{weather.location}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {weather.description}
          </p>
          <p className="text-2xl font-semibold">{Math.round(weather.temperature)}°C</p>
          {weather.icon && (
            <Image
              src={weather.icon}
              alt={weather.description}
              width={64}
              height={64}
              className="h-16 w-16"
            />
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">날씨 정보를 불러오지 못했습니다.</p>
      )}
    </article>
  );
}
