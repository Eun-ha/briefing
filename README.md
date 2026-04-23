# Briefing - 일일 브리핑 앱

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC)](https://tailwindcss.com/)

실시간 뉴스, 날씨, 교통 정보를 제공하는 현대적인 브리핑 웹 애플리케이션입니다.

## ✨ 주요 기능

- 📰 **실시간 뉴스**: NewsAPI를 활용한 최신 뉴스 기사 제공
- 🌤️ **날씨 정보**: OpenWeatherMap API를 통한 현재 날씨 및 예보
- 🚗 **교통 정보**: Kakao Mobility API를 활용한 실시간 교통 소요시간 계산
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 최적화된 UI
- ⚡ **서버 사이드 렌더링**: Next.js를 활용한 빠른 초기 로딩
- 🎨 **다크 모드 지원**: 시스템 테마에 자동 적응

## 🛠️ 기술 스택

### Frontend
- **Next.js 16.2.3** - React 기반 풀스택 프레임워크
- **React 19.2.4** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성 제공
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크

### Backend & API
- **Next.js API Routes** - 서버리스 API 엔드포인트
- **Axios** - HTTP 클라이언트
- **NewsAPI** - 뉴스 데이터
- **OpenWeatherMap API** - 날씨 데이터
- **Kakao Mobility API** - 교통 정보

### 개발 도구
- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 처리
- **TypeScript Compiler** - 타입 체킹

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js 18.0 이상
- npm, yarn, pnpm, 또는 bun

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd briefing

# 의존성 설치
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 API 키들을 설정하세요:

```env
# NewsAPI 키 (https://newsapi.org/)
NEW_API_KEY=your_news_api_key_here

# OpenWeatherMap API 키 (https://openweathermap.org/api)
WEATHER_API_KEY=your_openweather_api_key_here

# Kakao REST API 키 (https://developers.kakao.com/)
KAKAO_API_KEY=your_kakao_api_key_here
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📡 API 엔드포인트

### GET `/api/briefing`
뉴스와 날씨 데이터를 반환합니다.

**응답 예시:**
```json
{
  "success": true,
  "data": {
    "news": [...],
    "weather": {...}
  }
}
```

### GET `/api/traffic`
교통 소요시간을 계산합니다.

**쿼리 파라미터:**
- `originLat`: 출발지 위도
- `originLng`: 출발지 경도
- `destLat`: 도착지 위도
- `destLng`: 도착지 경도

**예시 요청:**
```
GET /api/traffic?originLng=126.9706&originLat=37.5546&destLng=127.0276&destLat=37.4979
```

**응답 예시:**
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

## 📁 프로젝트 구조

```
briefing/
├── app/
│   ├── api/
│   │   ├── test/
│   │   │   └── route.ts          # 뉴스/날씨 API
│   │   ├── traffic/
│   │   │   └── route.ts          # 교통 정보 API
│   │   ├── news/
│   │   │   └── route.ts          # 뉴스 API (별도)
│   │   └── weather/
│   │       └── route.ts          # 날씨 API (별도)
│   ├── components/
│   │   ├── NewsSection.tsx       # 뉴스 표시 컴포넌트
│   │   ├── WeatherSection.tsx    # 날씨 표시 컴포넌트
│   │   └── TrafficSection.tsx    # 교통 정보 컴포넌트
│   ├── sevices/
│   │   ├── newsService.ts        # 뉴스 API 서비스
│   │   ├── weatherService.ts     # 날씨 API 서비스
│   │   └── trafficService.ts     # 교통 API 서비스
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 메인 페이지
│   └── providers/
│       └── QueryProvider.tsx     # React Query 프로바이더 (미사용)
├── public/                       # 정적 파일
├── .env.local                    # 환경 변수 (gitignore)
├── package.json                  # 프로젝트 설정
├── tailwind.config.ts           # Tailwind 설정
├── next.config.ts               # Next.js 설정
├── tsconfig.json                # TypeScript 설정
└── README.md                     # 프로젝트 설명
```

## 🎯 사용 방법

### 뉴스와 날씨 확인
페이지 로드 시 자동으로 최신 뉴스와 서울 날씨 정보가 표시됩니다.

### 교통 정보 계산
1. 교통 정보 섹션에서 출발지와 도착지의 위도/경도를 입력하세요
2. "소요시간 계산" 버튼을 클릭하세요
3. 실시간 교통 소요시간이 표시됩니다

**예시 좌표:**
- 서울역: 위도 37.5546, 경도 126.9706
- 강남역: 위도 37.4979, 경도 127.0276
- 시청: 위도 37.5668, 경도 126.9784

## 🔧 개발 및 빌드

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

### 린팅

```bash
npm run lint
```

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙋‍♂️ 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 열어주세요.

---

**Note**: 이 프로젝트는 학습 및 데모 목적으로 만들어졌습니다. 실제 프로덕션 사용 시 API 키 관리와 보안에 유의하세요.
