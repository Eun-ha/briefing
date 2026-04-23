import axios from "axios";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// OpenWeatherMap API 응답 타입들
interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

interface WeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

interface WeatherClouds {
  all: number;
}

interface WeatherSys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherCoord {
  lon: number;
  lat: number;
}

interface WeatherResponse {
  coord: WeatherCoord;
  weather: WeatherInfo[];
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: WeatherWind;
  clouds: WeatherClouds;
  dt: number;
  sys: WeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// getWeather 함수의 리턴 타입
interface WeatherResult {
  location: string;
  temperature: number;
  description: string;
  icon: string;
}

// 에러 타입
interface WeatherError {
  message: string;
  code?: string;
}

async function getWeather(location: string = 'seoul'): Promise<WeatherResult | null> {
  try {
    const response = await axios.get<WeatherResponse>(WEATHER_API_URL, {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    });

    const weatherData = response.data;
    return {
      location: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
    };

  } catch (error) {
    const weatherError: WeatherError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      code: axios.isAxiosError(error) ? error.code : undefined,
    };

    console.error('Error fetching weather data:', weatherError.message);
    return null;
  }
}

export {
  getWeather,
  type WeatherResult,
  type WeatherError,
  type WeatherResponse,
};
