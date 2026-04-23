import axios from "axios";

const NEWS_API_KEY = process.env.NEW_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

// 뉴스 기사 타입
interface Article {
  title: string;
  url: string;
}

// NewsAPI 응답 타입
interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    title: string;
    url: string;
    description?: string;
    publishedAt: string;
    source: {
      name: string;
    };
  }>;
}

// getNews 함수의 리턴 타입
interface NewsResult {
  category: string;
  headlines: Article[];
}

// 에러 타입
interface NewsError {
  message: string;
  code?: string;
}

async function getNews(category: string = 'technology'): Promise<NewsResult | null> {
  try {
    const response = await axios.get<NewsApiResponse>(NEWS_API_URL, {
      params: {
        category,
        apiKey: NEWS_API_KEY,
        country: 'us', // 한국 뉴스 대신 미국 뉴스로 변경
        pageSize: 5,
      },
    });

    const articles: Article[] = response.data.articles.map((article) => ({
      title: article.title,
      url: article.url,
    }));

    return {
      category,
      headlines: articles,
    };

  } catch (error) {
    const newsError: NewsError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      code: axios.isAxiosError(error) ? error.code : undefined,
    };

    console.error("Error fetching news:", newsError.message);
    return null;
  }
}

export {
  getNews,
  type Article,
  type NewsResult,
  type NewsError,
};
