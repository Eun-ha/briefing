# Briefing - 일일 브리핑 앱

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC)](https://tailwindcss.com/)

실시간 뉴스, 날씨, 교통 정보를 한 화면에서 확인할 수 있는 Next.js 기반 브리핑 웹 애플리케이션입니다.

## ✨ 핵심 기능

- 📰 **뉴스 브리핑**: NewsAPI Top Headlines에서 카테고리별 최신 기사 조회
- 🌤️ **날씨 정보**: OpenWeatherMap 현재 날씨 API 기반 지역별 날씨 조회
- 🚗 **교통 소요시간 계산**: 출발지/도착지 좌표 입력 시 Kakao Mobility Directions API로 예상 시간 계산
- ⚡ **서버 렌더링 기반 초기 데이터 로딩**: `/api/briefing` 호출로 뉴스/날씨를 서버에서 병렬 조회

## 🧱 기술 스택

- **Framework**: Next.js 16.2.3 (App Router)
- **UI**: React 19.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + PostCSS
- **HTTP Client**: axios

## 🚀 시작하기

## 1) 요구 사항

- Node.js 18+
- npm

## 2) 설치

```bash
git clone <repository-url>
cd briefing
npm install
```

## 3) 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 설정하세요.

```env
# NewsAPI (https://newsapi.org/)
NEWS_API_KEY=your_news_api_key

# OpenWeatherMap (https://openweathermap.org/api)
WEATHER_API_KEY=your_openweather_api_key

# Kakao Developers REST API Key (https://developers.kakao.com/)
KAKAO_API_KEY=your_kakao_api_key

# (선택) 서버 사이드 fetch용 기본 URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> `NEXT_PUBLIC_BASE_URL`가 없으면 기본값으로 `http://localhost:3000`을 사용합니다.

## 4) 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다.

## 📡 API 명세

## GET `/api/briefing`

뉴스와 날씨를 병렬로 조회해 반환합니다.

- Query params
  - `category` (optional, 기본값: `technology`)
  - `location` (optional, 기본값: `seoul`)

응답 예시:

```json
{
  "success": true,
  "data": {
    "news": {
      "category": "technology",
      "headlines": [
        {
          "title": "...",
          "url": "..."
        }
      ]
    },
    "weather": {
      "location": "Seoul",
      "temperature": 23.4,
      "description": "맑음",
      "icon": "http://openweathermap.org/img/wn/10d.png"
    }
  }
}
```

## GET `/api/traffic`

좌표를 받아 예상 소요 시간을 계산해 반환합니다.

- Query params (모두 필수)
  - `originLat`
  - `originLng`
  - `destLat`
  - `destLng`

요청 예시:

```text
GET /api/traffic?originLng=126.9706&originLat=37.5546&destLng=127.0276&destLat=37.4979
```

응답 예시:

```json
{
  "success": true,
  "data": {
    "traffic": {
      "origin": "출발지",
      "destination": "도착지",
      "duration_in_minutes": 36
    }
  }
}
```

필수 파라미터가 없으면 `400` 에러를 반환합니다.

## 🖥️ 화면 동작 요약

- 메인 페이지는 서버에서 `/api/briefing`을 호출해 뉴스/날씨를 렌더링합니다.
- 교통 정보는 클라이언트 컴포넌트에서 좌표 입력 후 `/api/traffic`를 호출합니다.
- 뉴스/날씨 API 호출 실패 시 각 섹션에서 fallback 메시지를 표시합니다.

## 📁 현재 프로젝트 구조

```text
briefing/
├── app/
│   ├── api/
│   │   ├── briefing/route.ts
│   │   └── traffic/route.ts
│   ├── components/
│   │   ├── NewsSection.tsx
│   │   ├── WeatherSection.tsx
│   │   └── TrafficSection.tsx
│   ├── services/
│   │   ├── newsService.ts
│   │   ├── weatherService.ts
│   │   └── trafficService.ts
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── globals.css
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 스크립트

```bash
npm run dev    # 개발 서버
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 실행
npm run lint   # ESLint 실행
```

## 📌 참고

- 외부 API 키가 없거나 유효하지 않으면 뉴스/날씨/교통 데이터가 `null` 또는 실패 응답으로 처리될 수 있습니다.
- 실제 배포 시에는 환경 변수와 API 사용량(쿼터/요금 정책)을 반드시 확인하세요.
