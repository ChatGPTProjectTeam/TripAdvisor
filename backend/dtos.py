from datetime import date
from typing import Literal,Union
from pydantic_settings import BaseSettings
from pydantic import BaseModel, Field


# class TripInfo(BaseModel):
#     mbti: str
#     province: Literal["Tokyo"]
#     days: int
#     start_date: date
#     trip_member_num: int
#     trip_style_text: str
#     start_time_preference: Literal["day"] = Field(..., alias="startTimePreference")
class TripInfo(BaseModel):
    mbti: str
    province: Literal["Tokyo"]
    days: int
    start_date: date
    trip_member_num: int
    trip_style_text: str
    start_time_preference: Literal["day"] = Field(..., alias="startTimePreference")

class PlaneInfo(BaseModel):
    # 스카이스캐너에서 가져온 비행 정보 예시 필드
    departure: str
    arrival: str
    airline: str


class AccommodationInfo(BaseModel):
    # 스카이스캐너에서 가져온 숙소 정보 예시 필드
    name: str
    location: str
    rating: float
    market: Union[str,None]
    locale: str
    currency: str
#숙소 관련해서 request response 보내는 api에 따라
class RestaurantInfo(BaseModel):
    # 데이터베이스에서 가져온 식당 정보 예시 필드
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
    component_id: int
    component_type: str
    plane_info: PlaneInfo | None
    accommodation_info: AccommodationInfo | None
    day_plan_list: list[DayPlan] = []


class TripPlan(BaseModel):
    chat_id : int
    trip_plan_id: int | None
    trip_plan: list[PlanComponent]

class UserInput(BaseModel):
    msg: str