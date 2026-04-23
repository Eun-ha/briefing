import { getTrafficInfo } from "../../services/trafficService";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const originLat = url.searchParams.get("originLat");
  const originLng = url.searchParams.get("originLng");
  const destLat = url.searchParams.get("destLat");
  const destLng = url.searchParams.get("destLng");

  // 필수 파라미터 검증
  if (!originLat || !originLng || !destLat || !destLng) {
    return Response.json(
      {
        success: false,
        message: "모든 좌표 파라미터(originLat, originLng, destLat, destLng)가 필요합니다.",
      },
      { status: 400 },
    );
  }

  try {
    const traffic = await getTrafficInfo(originLng, originLat, destLng, destLat);

    return Response.json({
      success: true,
      data: {
        traffic,
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