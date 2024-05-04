from datetime import date
from typing import Literal

from pydantic import BaseModel, Field


# Deprecated
class TripInfo(BaseModel):
    mbti: str
    province: str
    days: int
    start_date: date
    trip_member_num: int
    trip_style_text: str


class PlaneInfo(BaseModel):
    """
    # 스카이스캐너에서 가져온 비행 정보 예시 필드
    """

    price: str  # 가격
    origin: str  # 출발지
    destination: str  # 목적지
    departure: str  # 출발일
    arrival: str  # 도착일
    airline: str  # 항공사


class AccommodationInfo(BaseModel):
    """
    스카이스캐너에서 가져온 숙소 정보 예시 필드
    """

    name: str  # 숙소 이름
    stars: str  # 몇 성 호텔인지 (없을 경우에 "no_stars")
    lowest_price: str  # 여러 SKYSCANNER 제휴 숙소 앱 중 해당 숙소를 가장 싸게 예약할 수 있는 가격
    rating: str  # 리뷰 평균 평점
    location: str  # 주소


class RestaurantInfo(BaseModel):
    """
    데이터베이스에서 가져온 식당 정보 예시 필드
    - 숙소 관련해서 request response 보내는 api에 따라
    - 가장 우선순위 마지막
    """

    name: str
    cuisine: str
    rating: float


class TimePlanDTO(BaseModel):
    activity: str = ""
    restaurant: RestaurantInfo | None


class DayPlanDTO(BaseModel):
    date: date
    morning: TimePlanDTO
    afternoon: TimePlanDTO
    evening: TimePlanDTO


class PlanComponentDTO(BaseModel):
    component_id: int
    component_type: str
    plane_info: PlaneInfo | None
    accommodation_info: AccommodationInfo | None
    day_plan_list: list[DayPlanDTO] = []


class PlanDTO(BaseModel):
    plan_id: int | None
    province: str
    created_at: date = Field(default_factory=date.today)
    plan_component_list: list[PlanComponentDTO]


"""
Request, Response DTOs
"""


class FormRequestDTO(BaseModel):
    mbti: str
    province: str
    days: int | None
    start_date: date
    trip_member_num: int
    trip_style_text: str


class PlanListResponseDTO(BaseModel):
    plan_list: list[PlanDTO]


class UserInput(BaseModel):
    msg: str
