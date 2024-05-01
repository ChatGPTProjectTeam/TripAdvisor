from datetime import date
import httpx
from backend.dtos import PlaneInfo, AccommodationInfo


class SkyscannerService:
    def create_plane_and_accommodation_info(
        self, province: str, days: int, start_date: date
    ) -> tuple[PlaneInfo, AccommodationInfo]:
        # TODO: 스카이스캐너 API를 이용해 실제 정보를 가져오기
        rapidapi_key = "624765a753mshb85d115a65c6345p13f6dfjsnf28f2552e32e"
        rapidapi_host= "skyscanner80.p.rapidapi.com"
        plane_info = PlaneInfo(
            departure="Seoul",
            arrival=province,
            airline="korean air",
        )
        accommodation_info = AccommodationInfo(
            name="Intercontinental Hotel",
            location=province,
            rating=4.5,
        )
        return plane_info, accommodation_info

    async def search_hotels(self):
        url = "https://skyscanner80.p.rapidapi.com/api/v1/hotels/auto-complete"
        params = {"query": "new", "market": "US", "locale": "en-US"}
        headers = {
            "X-RapidAPI-Key": "624765a753mshb85d115a65c6345p13f6dfjsnf28f2552e32e",
            "X-RapidAPI-Host": "skyscanner80.p.rapidapi.com"
        }
        async with httpx.AsyncClient() as client:
            response = await clinet.get(url,header=headers, params= params)
            return response.json()