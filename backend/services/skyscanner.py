from datetime import date
import httpx
from backend.dtos import PlaneInfo, AccommodationInfo


class SkyscannerService:
    def create_plane_and_accommodation_info(
        self, province: str, days: int, start_date: date
    ) -> tuple[PlaneInfo, AccommodationInfo]:
        # TODO: 스카이스캐너 API를 이용해 실제 정보를 가져오기
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
    
    def _search_airport(self, trip_info: TripInfo) -> str:
        url = "https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete"

        querystring = {"query":trip_info.province,"market":"KR","locale":"ko-KR"}

        headers = {
	        "X-RapidAPI-Key": "ce3430f31dmshe7136743678161cp1a6574jsn992de6afc191",
	        "X-RapidAPI-Host": "skyscanner80.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)
        airport_id: str
        airport_id = response
        return airport_id
    
    def create_plane_info(self, trip_info: TripInfo) -> PlaneInfo:
        
        airport_id = self._search_airport(TripInfo)
        
        return_date = trip_info.start_date() + timedelta(days = trip_info.days)
        
        url = "https://sky-scanner3.p.rapidapi.com/flights/search-one-way"

        querystring = {"fromEntityId":"eyJlIjoiOTU1NjUwODUiLCJzIjoiQkNOIiwiaCI6IjI3NTQ4MjgzIn0=","toEntityId":"eyJlIjoiOTU2NzM3NDQiLCJzIjoiTlVFIiwiaCI6IjI3NTQ1MTYyIn0=","departDate":"<REQUIRED>"}

        headers = {
	        "X-RapidAPI-Key": "ce3430f31dmshe7136743678161cp1a6574jsn992de6afc191",
	        "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)

        print(response.json())
        
        plane_info = PlaneInfo(
            departure="Seoul",
            arrival="Tokyo",
            airline="korean air",
        )
        return plane_info

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