import axios from "axios";

const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
const KAKAO_DIRECTIONS_URL = 'https://apis-navi.kakaomobility.com/v1/directions';

// Kakao Directions API 응답 타입들
interface RouteSummary {
  origin: {
    name?: string;
  };
  destination: {
    name?: string;
  };
  waypoints?: Array<{
    name?: string;
  }>;
  distance: number;
  duration: number;
  spend_time: number;
  toll_cost?: number;
  bounded?: boolean;
}

interface Route {
  result_code?: number;
  result_message?: string;
  summary: RouteSummary;
  sections?: Array<{
    distance: number;
    duration: number;
    roads?: Array<{
      name: string;
      distance: number;
      duration: number;
      traffic?: string;
      category?: string;
    }>;
  }>;
}

interface DirectionsResponse {
  trans_id?: string;
  routes: Route[];
}

// getTrafficInfo 함수의 리턴 타입
interface TrafficResult {
  origin: string;
  destination: string;
  duration_in_minutes: number;
}

// 에러 타입
interface TrafficError {
  message: string;
  code?: string;
  statusCode?: number;
}

async function getTrafficInfo(originLng: string = '126.9705', originLat: string = '37.5559', destLng: string = '126.9882', destLat: string = '37.5512'): Promise<TrafficResult | null> {
  try {
    const origin = `${originLng},${originLat}`;
    const destination = `${destLng},${destLat}`;

    const response = await axios.get<DirectionsResponse>(KAKAO_DIRECTIONS_URL, {
      params: {
        origin,
        destination,
      },
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    const durationInSeconds = response.data.routes[0].summary.duration;

    return {
      origin: '출발지',
      destination: '도착지',
      duration_in_minutes: Math.round(durationInSeconds / 60), // 분 단위로 변환
    };

  } catch (error) {
    const trafficError: TrafficError = {
      message: axios.isAxiosError(error) 
        ? error.response?.data?.message || error.message 
        : error instanceof Error ? error.message : 'Unknown error occurred',
      code: axios.isAxiosError(error) ? error.code : undefined,
      statusCode: axios.isAxiosError(error) ? error.response?.status : undefined,
    };

    console.error('Error fetching traffic info:', trafficError.message);
    return null;
  }
}

export {
  getTrafficInfo,
  type TrafficResult,
  type TrafficError,
  type DirectionsResponse,
};
