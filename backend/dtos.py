from datetime import date
from typing import Literal, Union
from pydantic_settings import BaseSettings
from pydantic import BaseModel, Field


class ChatInfo(BaseModel):
    chat_id: int
    title: str
    created_date: date
    updated_date: date
    isOpen: bool


# class TripInfo(BaseModel):
#     mbti: str
#     province: Literal["Tokyo"]
#     days: int
#     start_date: date
#     trip_member_num: int
#     trip_style_text: str
#     start_time_preference: Literal["day"] = Field(..., alias="startTimePreference")
class TripInfo(BaseModel):
    chat_id: int
    mbti: str
    province: Literal["Tokyo"]
    days: int
    start_date: date
    trip_member_num: int
    trip_style_text: str
    start_time_preference: Literal["day"] = Field(..., alias="startTimePreference")


class PlaneInfo(BaseModel):
    # 스카이스캐너에서 가져온 비행 정보 예시 필드
    price: str        #가격
    origin: str         #출발지
    destination: str    #목적지
    departure: str      #출발일
    arrival: str        #도착일
    airline: str        #항공사

class AccommodationInfo(BaseModel):
    # 스카이스캐너에서 가져온 숙소 정보 예시 필드
    name: str           #숙소 이름
    stars: str          #몇 성 호텔인지 (없을 경우에 "no_stars")
    lowest_price: str   #여러 SKYSCANNER 제휴 숙소 앱 중 해당 숙소를 가장 싸게 예약할 수 있는 가격
    rating: str         #리뷰 평균 평점
    location: str       #주소


# 숙소 관련해서 request response 보내는 api에 따라
# 가장 우선순위 마지막
class RestaurantInfo(BaseModel):
    # 데이터베이스에서 가져온 식당 정보 예시 필드
    chat_id: int
    name: str
    cuisine: str
    rating: float


class SubPlan(BaseModel):
    activity: str = ""
    restaurant: RestaurantInfo | None


class DayPlan(BaseModel):
    plan_id: int
    date: date
    morning: SubPlan
    afternoon: SubPlan
    evening: SubPlan


class PlanComponent(BaseModel):
    chat_id: int
    component_id: int
    component_type: str
    plane_info: PlaneInfo | None
    accommodation_info: AccommodationInfo | None
    day_plan_list: list[DayPlan] = []


class TripPlan(BaseModel):
    chat_id: int
    trip_plan_id: int | None
    trip_plan: list[PlanComponent]


class UserInput(BaseModel):
    msg: str
