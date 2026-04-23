import { getNews } from "../../sevices/newsService";
import { getWeather } from "../../sevices/weatherService";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? "technology";
  const location = url.searchParams.get("location") ?? "seoul";

  try {
    const [news, weather] = await Promise.all([
      getNews(category),
      getWeather(location),
    ]);

    return Response.json({
      success: true,
      data: {
        news,
        weather,
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

