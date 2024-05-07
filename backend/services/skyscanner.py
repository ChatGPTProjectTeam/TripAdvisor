from datetime import timedelta, datetime

import requests

from backend.database import SessionLocal
from backend.dtos import PlaneInfoDTO, AccommodationInfoDTO, TripInfo
from backend.models import PlaneInfo, AccommodationInfo
from backend.settings import settings


class SkyscannerService:
    def create_plane_and_accommodation_info(
            self, trip_info: TripInfo
    ) -> tuple[PlaneInfo, PlaneInfo, AccommodationInfo]:
        from_plane_info_data = self.create_plan_info_dto(trip_info, 0)
        to_plane_info_data = self.create_plan_info_dto(trip_info, 1)
        accommodation_info_data = self.create_accommodation_info(trip_info)

        if from_plane_info_data == None:
            from_plane_info = PlaneInfo(
                price="",
                origin="",
                destination="",
                departure="",
                arrival="",
                airline="",
            )
        else:

            from_plane_info = PlaneInfo(
                price=from_plane_info_data.price,
                origin=from_plane_info_data.origin,
                destination=from_plane_info_data.destination,
                departure=from_plane_info_data.departure,
                arrival=from_plane_info_data.arrival,
                airline=from_plane_info_data.airline,
            )
        if to_plane_info_data == None:
            to_plane_info = PlaneInfo(
                price="",
                origin="",
                destination="",
                departure="",
                arrival="",
                airline="",
            )
        else:
            to_plane_info = PlaneInfo(
                price=to_plane_info_data.price,
                origin=to_plane_info_data.origin,
                destination=to_plane_info_data.destination,
                departure=to_plane_info_data.departure,
                arrival=to_plane_info_data.arrival,
                airline=to_plane_info_data.airline,
            )

        if accommodation_info_data == None:
            accommodation_info = AccommodationInfo(
                name="",
                stars="",
                lowest_price="",
                rating="",
                location="",
            )
        else:
            accommodation_info = AccommodationInfo(
                name=accommodation_info_data.name,
                stars=accommodation_info_data.stars,
                lowest_price=accommodation_info_data.lowest_price,
                rating=accommodation_info_data.rating,
                location=accommodation_info_data.location,
            )

        with SessionLocal() as session:
            session.add(from_plane_info)
            session.add(to_plane_info)
            session.add(accommodation_info)
            session.commit()
            session.refresh(from_plane_info)
            session.refresh(to_plane_info)
            session.refresh(accommodation_info)
        return from_plane_info, to_plane_info, accommodation_info

    def create_accommodation_info(self, trip_info: TripInfo) -> AccommodationInfoDTO:
        """
        https://rapidapi.com/ntd119/api/sky-scanner3 에서 hotels/search api 에 해당합니다.
        숙소에 관한 정보를 가져옵니다.
        """
        location_id = self._search_location(trip_info)
        return_date = trip_info.start_date + timedelta(days=trip_info.days)

        if location_id == None:
            return None

        # 이유는 모르지만 completion_percentage가 100이 될때까지 api call을 반복수행하라고 하네요
        while True:
            # 맨 아래 _call_api 함수를 참고해주세요
            data = self._call_api(
                "https://sky-scanner3.p.rapidapi.com/hotels/search",
                {
                    "entityId": location_id,
                    "checkin": trip_info.start_date,
                    "checkout": return_date,
                    "adults": trip_info.trip_member_num,
                    "market": "KR",
                    "locale": "ko-KR",
                    "currency": "KRW",
                    "sorting": "-rating",  # Default value: -relevance
                },
            )
            completion_percentage = data["data"]["status"]["completionPercentage"]

            if completion_percentage >= 100:
                break

        # reviewsSummary가 없어서 에러나는 경우가 생겨 reviewsSummary 있는 숙소만 찾도록 변경했습니다.
        accommodation = None
        for hotel in data["data"]["results"]["hotelCards"]:
            if hotel["reviewsSummary"] != None:
                accommodation = hotel
                break

        if accommodation == None:
            return None

        accommodation_id = accommodation["id"]

        # check-in time, check-out time, location
        detailed_data = self._call_api(
            "https://sky-scanner3.p.rapidapi.com/hotels/detail",
            {"id": accommodation_id},
        )

        return AccommodationInfoDTO(
            name=accommodation["name"],
            stars=accommodation["stars"],
            lowest_price=accommodation["lowestPrice"][
                "price"
            ],
            rating=str(
                accommodation["reviewsSummary"]["score"]
            ),
            location=detailed_data["data"]["location"]["address"],
            # accommodation_image = data["data"]["result"]["hotelCards"][0]["images"]  # list of image urls
        )

    def _search_location(self, trip_info: TripInfo) -> str:
        """
        hotels/auto-complete api 에 해당합니다. province 기반으로 search_accomandation에서 검색할 지역 id를 return 합니다.
        """
        data = self._call_api(
            "https://sky-scanner3.p.rapidapi.com/hotels/auto-complete",
            {"query": trip_info.province, "market": "KR", "locale": "ko-KR"},
        )

        if data == None:
            return None

        location_id = data["data"][0]["entityId"]  # "27542089"

        return location_id

    def create_plan_info_dto(self, trip_info: TripInfo, direction: int) -> PlaneInfoDTO:
        """
        flights/search-one-way api 에 해당합니다. 편도 비행기표를 찾습니다.
        왕복대신 편도를 쓴 이유는 왕복으로 찾을 경우 갈 때 가격, 올 때 가격을 따로 계산하지 않고 합쳐서 계산하기 때문에
        나중에 feedback 받을 때 수정하기 어려울 것 같아서 이렇게 했습니다.
        사실 왕복으로 검색하고 flights/detail api로 각 비행 id를 넣어 따로 계산할 순 있는데 귀찮아서 일단 이렇게 했습니다.
        """
        airport_id = self._search_airport(trip_info)

        if airport_id == None:
            return None

        if direction == 0:  # 가는 비행기
            data = self._call_api(
                "https://sky-scanner3.p.rapidapi.com/flights/search-one-way",
                {
                    "fromEntityId": "eyJzIjoiSUNOIiwiZSI6Ijk1NjczNjU5IiwiaCI6IjI3NTM4NjM4In0=",
                    "toEntityId": airport_id,
                    "departDate": trip_info.start_date,
                    "market": "KR",
                    "locale": "ko-KR",
                    "currency": "KRW",
                    "adults": trip_info.trip_member_num,
                },
            )
        elif direction == 1:  # 오는 비행기
            return_date = trip_info.start_date + timedelta(days=trip_info.days)
            data = self._call_api(
                "https://sky-scanner3.p.rapidapi.com/flights/search-one-way",
                {
                    "fromEntityId": airport_id,
                    "toEntityId": "eyJzIjoiSUNOIiwiZSI6Ijk1NjczNjU5IiwiaCI6IjI3NTM4NjM4In0=",
                    "departDate": return_date,
                    "market": "KR",
                    "locale": "ko-KR",
                    "currency": "KRW",
                    "adults": trip_info.trip_member_num,
                },
            )

        status = data["data"]["context"]["status"]

        # 사이트에서 status == incomplete로 나오면 search/incomplete 쓰라고 해서 그렇게 했습니다.
        # 코드 중복이 생기긴 했는데 줄일 수 있을지 잘 모르겠네요.
        if status == "incomplete":
            session_id = data["data"]["context"]["sessionId"]
            return self._search_incomplete(session_id)
        elif status == "failure":
            return PlaneInfoDTO(
                price="",
                origin="",
                destination="",
                departure="",
                arrival="",
                airline="",
            )

        # 저희 일정이 가는날 오전/오기 바로 전날 저녁까지 만들어지기 때문에 아침 도착 비행기만 검색하도록 만들었습니다. 데모 이후 변경 필요합니다.
        flight = None
        for itinerary in data["data"]["itineraries"]:
            arrival_time = datetime.strptime(itinerary["legs"][0]["arrival"], '%Y-%m-%dT%H:%M:%S')
            if arrival_time < datetime(arrival_time.year, arrival_time.month, arrival_time.day, 10):
                flight = itinerary
                break

        if flight == None:
            return None

        return PlaneInfoDTO(
            price=str(flight["price"]["formatted"]),
            origin=flight["legs"][0]["origin"]["name"],
            destination=flight["legs"][0]["destination"]["name"],
            departure=flight["legs"][0]["departure"],
            arrival=flight["legs"][0]["arrival"],
            airline=flight["legs"][0]["carriers"]["marketing"][0]["name"],
        )

    def _search_airport(self, trip_info: TripInfo) -> str:
        """
        공항 id 찾는 flights/auto-complete api 입니다.
        """
        data = self._call_api(
            "https://sky-scanner3.p.rapidapi.com/flights/auto-complete",
            {"query": trip_info.province, "market": "KR", "locale": "ko-KR"},
        )

        if data == None:
            return None

        airport_id = data["data"][0]["presentation"]["id"]

        return airport_id

    def _search_incomplete(self, session_id: str) -> PlaneInfoDTO:
        """
        status == incomplete 나오면 쓰는 search/incomplete api 입니다.
        """
        data = self._call_api(
            "https://sky-scanner3.p.rapidapi.com/flights/search-incomplete",
            {
                "sessionId": session_id,
                "currency": "KRW",
                "market": "KR",
                "locale": "ko-KR",
            },
        )

        # 저희 일정이 가는날 오전/오기 바로 전날 저녁까지 만들어지기 때문에 아침 도착 비행기만 검색하도록 만들었습니다. 데모 이후 변경 필요합니다.
        flight = None
        for itinerary in data["data"]["itineraries"]:
            arrival_time = datetime.strptime(itinerary["legs"][0]["arrival"], '%Y-%m-%dT%H:%M:%S')
            if arrival_time < datetime(arrival_time.year, arrival_time.month, arrival_time.day, 10):
                flight = itinerary
                break

        if flight == None:
            return None

        return PlaneInfoDTO(
            price=str(flight["price"]["formatted"]),
            origin=flight["legs"][0]["origin"]["name"],
            destination=flight["legs"][0]["destination"]["name"],
            departure=flight["legs"][0]["departure"],
            arrival=flight["legs"][0]["arrival"],
            airline=flight["legs"][0]["carriers"]["marketing"][0]["name"],
        )

    def _call_api(self, end_point: str, querystring: dict) -> dict:
        """
        requests 라이브러리 써서 api call하는게 많이 겹쳐서 함수로 만들었습니다.
        """
        headers = {
            "X-RapidAPI-Key": settings.SKYSCANNER_API_KEY,
            "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
        }
        # 예외처리 부분은 gpt가 짜줬습니다.
        try:
            response = requests.get(end_point, headers=headers, params=querystring)
            response.raise_for_status()  # HTTP 오류가 발생하면 예외를 발생시킵니다.
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            return None
