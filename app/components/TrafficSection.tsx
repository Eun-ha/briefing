'use client';

import { useState } from 'react';
import type { TrafficResult } from "../sevices/trafficService";

export function TrafficSection() {
  const [originLat, setOriginLat] = useState('');
  const [originLng, setOriginLng] = useState('');
  const [destLat, setDestLat] = useState('');
  const [destLng, setDestLng] = useState('');
  const [calculatedTraffic, setCalculatedTraffic] = useState<TrafficResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (!originLat || !originLng || !destLat || !destLng) {
      setError('모든 좌표를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/traffic?originLat=${originLat}&originLng=${originLng}&destLat=${destLat}&destLng=${destLng}`);
      const result = await response.json();

      if (result.success) {
        setCalculatedTraffic(result.data.traffic);
      } else {
        setError(result.message || '교통 정보를 가져오는데 실패했습니다.');
      }
    } catch {
      setError('API 호출 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">교통 정보</h2>
      </div>

      {/* 좌표 입력 폼 */}
      <div className="mt-4 space-y-4">
        {/* 예시 좌표 */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
          <p>예시 좌표:</p>
          <p>• 서울역: 위도 37.5546, 경도 126.9706</p>
          <p>• 강남역: 위도 37.4979, 경도 127.0276</p>
          <p>• 시청: 위도 37.5668, 경도 126.9784</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              출발지 위도
            </label>
            <input
              type="text"
              value={originLat}
              onChange={(e) => setOriginLat(e.target.value)}
              placeholder="예: 37.5546"
              className="w-full px-3 py-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              출발지 경도
            </label>
            <input
              type="text"
              value={originLng}
              onChange={(e) => setOriginLng(e.target.value)}
              placeholder="예: 126.9706"
              className="w-full px-3 py-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              도착지 위도
            </label>
            <input
              type="text"
              value={destLat}
              onChange={(e) => setDestLat(e.target.value)}
              placeholder="예: 37.5512"
              className="w-full px-3 py-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              도착지 경도
            </label>
            <input
              type="text"
              value={destLng}
              onChange={(e) => setDestLng(e.target.value)}
              placeholder="예: 126.9882"
              className="w-full px-3 py-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '계산 중...' : '소요시간 계산'}
        </button>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      {/* 결과 표시 */}
      {calculatedTraffic ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {calculatedTraffic.origin} → {calculatedTraffic.destination}
          </p>
          <p className="text-2xl font-semibold">{calculatedTraffic.duration_in_minutes}분</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">예상 소요 시간</p>
        </div>
      ) : !calculatedTraffic && (
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          좌표를 입력하고 계산 버튼을 눌러보세요.
        </p>
      )}
    </article>
  );
}
