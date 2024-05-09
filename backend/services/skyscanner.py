from concurrent.futures import as_completed
from datetime import date, datetime
from concurrent.futures.thread import ThreadPoolExecutor
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

        with ThreadPoolExecutor(max_workers=3) as executor:
            from_plane_worker = executor.submit(
                self.create_plane_info_dto, trip_info, 0
            )
            to_plane_worker = executor.submit(self.create_plane_info_dto, trip_info, 1)
            accommodation_worker = executor.submit(
                self.create_accommodation_info, trip_info
            )

        from_plane_info_data = from_plane_worker.result()
        to_plane_info_data = to_plane_worker.result()
        accommodation_info_data = accommodation_worker.result()

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

    def create_accommodation_info(
        self, trip_info: TripInfo
    ) -> AccommodationInfoDTO | None:
        """
        https://rapidapi.com/ntd119/api/sky-scanner3 에서 hotels/search api 에 해당합니다.
        숙소에 관한 정보를 가져옵니다.
        """
        location_id: str = self._search_location(trip_info)
        return_date: date | None = trip_info.start_date + timedelta(days=trip_info.days)

        if location_id == "":
            return None

        response_list = []
        while not response_list:
            with ThreadPoolExecutor(max_workers=3) as executor:
                # Future 객체 리스트 생성
                futures = [
                    executor.submit(
                        self._set_accomodation_info,
                        location_id,
                        return_date,
                        trip_info,
                    )
                    for _ in range(3)
                ]

                # 모든 작업이 완료되기를 기다림
                for future in as_completed(futures):
                    if future.result()["data"]["status"]["completionPercentage"] >= 100:
                        response_list.append(future.result())

        data = response_list[0]
        # reviewsSummary가 없어서 에러나는 경우가 생겨 reviewsSummary 있는 숙소만 찾도록 변경했습니다.
        accommodation = None
        for hotel in data["data"]["results"]["hotelCards"]:
            if hotel["reviewsSummary"] != None:
                accommodation = hotel
                break

        if accommodation is None:
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
            lowest_price=(
                accommodation["lowestPrice"]["price"]
                if accommodation["lowestPrice"]
                else ""
            ),
            rating=str(accommodation["reviewsSummary"]["score"]),
            location=detailed_data["data"]["location"]["address"],
            # accommodation_image = data["data"]["result"]["hotelCards"][0]["images"]  # list of image urls
        )

    def _set_accomodation_info(
        self,
        location_id: str,
        return_date: date,
        trip_info: TripInfo,
    ):
        response = self._call_api(
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
        return response

    def _search_location(self, trip_info: TripInfo) -> str:
        
        location_id = ""
        
        if trip_info.province == "일본 홋카이도":
            location_id = "81974298"
        elif trip_info.province == "일본 도호쿠 지방":
            location_id = "27546288"
        elif trip_info.province == "일본 간사이 지방":
            location_id = "27542908"
        elif trip_info.province == "일본 주코쿠 지방":
            location_id = "27542057"
        elif trip_info.province == "일본 간토 지방":
            location_id = "27542089"
        elif trip_info.province == "일본 시코쿠":
            location_id = "27550855"
        elif trip_info.province == "일본 주부 지방":
            location_id = "31976076"
        elif trip_info.province == "일본 규슈/오키나와":
            location_id = "27540768"
        else:
            location_id = "27542089"
        
        return location_id

    def create_plane_info_dto(
        self, trip_info: TripInfo, direction: int
    ) -> PlaneInfoDTO:
        """
        flights/search-one-way api 에 해당합니다. 편도 비행기표를 찾습니다.
        왕복대신 편도를 쓴 이유는 왕복으로 찾을 경우 갈 때 가격, 올 때 가격을 따로 계산하지 않고 합쳐서 계산하기 때문에
        나중에 feedback 받을 때 수정하기 어려울 것 같아서 이렇게 했습니다.
        사실 왕복으로 검색하고 flights/detail api로 각 비행 id를 넣어 따로 계산할 순 있는데 귀찮아서 일단 이렇게 했습니다.
        """
        location_id = self._search_airport(trip_info)

        if location_id == "":
            return None

        if direction == 0:  # 가는 비행기
            data = self._call_api(
                "https://sky-scanner3.p.rapidapi.com/flights/search-one-way",
                {
                    "fromEntityId": "eyJzIjoiSUNOIiwiZSI6Ijk1NjczNjU5IiwiaCI6IjI3NTM4NjM4In0=",
                    "toEntityId": location_id,
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
                    "fromEntityId": location_id,
                    "toEntityId": "eyJzIjoiSUNOIiwiZSI6Ijk1NjczNjU5IiwiaCI6IjI3NTM4NjM4In0=",
                    "departDate": return_date,
                    "market": "KR",
                    "locale": "ko-KR",
                    "currency": "KRW",
                    "adults": trip_info.trip_member_num,
                },
            )
            
        if data == None:
            return None
        status = data["data"]["context"]["status"]

        # 사이트에서 status == incomplete로 나오면 search/incomplete 쓰라고 해서 그렇게 했습니다.
        # 코드 중복이 생기긴 했는데 줄일 수 있을지 잘 모르겠네요.
        if status == "incomplete":
            session_id = data["data"]["context"]["sessionId"]
            return self._search_incomplete(session_id)
        elif status == "failure":
            return None

        # 저희 일정이 가는날 오전/오기 바로 전날 저녁까지 만들어지기 때문에 아침 도착 비행기만 검색하도록 만들었습니다. 데모 이후 변경 필요합니다.
        flight = None
        if direction == 1:
            for itinerary in data["data"]["itineraries"]:
                arrival_time = datetime.strptime(
                    itinerary["legs"][0]["arrival"], "%Y-%m-%dT%H:%M:%S"
                )
                if arrival_time < datetime(
                    arrival_time.year, arrival_time.month, arrival_time.day, 10
                ):
                    flight = itinerary
                    break
        else:
            flight = data["data"]["itineraries"][0]

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

        airport_id = ""
        
        if trip_info.province == "일본 홋카이도":
            airport_id = "eyJlIjoiMjc1Mzc1NTMiLCJzIjoiU1BLQSIsImgiOiIyNzUzNzU1MyIsInQiOiJDSVRZIn0="
        elif trip_info.province == "일본 도호쿠 지방":
            airport_id = "eyJlIjoiMTI4NjY4OTk1IiwicyI6IlNESiIsImgiOiIyNzU0NjI4OCIsInQiOiJBSVJQT1JUIn0="
        elif trip_info.province == "일본 간사이 지방":
            airport_id = "eyJlIjoiMTI4NjY3ODAyIiwicyI6IktJWCIsImgiOiIyNzU0MjkwOCIsInQiOiJBSVJQT1JUIn0="
        elif trip_info.province == "일본 주코쿠 지방":
            airport_id = "eyJlIjoiMTI4NjY3ODIxIiwicyI6IkhJSiIsImgiOiIyNzU0MjA1NyIsInQiOiJBSVJQT1JUIn0="
        elif trip_info.province == "일본 간토 지방":
            airport_id = "eyJlIjoiMjc1NDIwODkiLCJzIjoiVFlPQSIsImgiOiIyNzU0MjA4OSIsInQiOiJDSVRZIn0="
        elif trip_info.province == "일본 시코쿠":
            airport_id = "eyJlIjoiMTI4NjY3NDUyIiwicyI6IlRBSyIsImgiOiIyNzU1MDg1NSIsInQiOiJBSVJQT1JUIn0="
        elif trip_info.province == "일본 주부 지방":
            airport_id = "eyJlIjoiMjc1NDUxMDYiLCJzIjoiSk5HTyIsImgiOiIyNzU0NTEwNiIsInQiOiJDSVRZIn0="
        elif trip_info.province == "일본 규슈/오키나와":
            airport_id = "eyJlIjoiMTI4NjY3OTU3IiwicyI6IkZVSyIsImgiOiIyNzU0MTc0MCIsInQiOiJBSVJQT1JUIn0="
        else:
            airport_id = "eyJlIjoiMjc1NDIwODkiLCJzIjoiVFlPQSIsImgiOiIyNzU0MjA4OSIsInQiOiJDSVRZIn0="

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
            arrival_time = datetime.strptime(
                itinerary["legs"][0]["arrival"], "%Y-%m-%dT%H:%M:%S"
            )
            if arrival_time < datetime(
                arrival_time.year, arrival_time.month, arrival_time.day, 10
            ):
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
            print(e)
            return None
