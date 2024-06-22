from datetime import date, datetime

from pydantic import BaseModel, Field, field_validator


class PlaneInfoDTO(BaseModel):
    """
    skyscanner plane info
    """

    price: str = Field(description="가격")
    origin: str = Field(description="출발지")
    destination: str = Field(description="목적지")
    departure: str = Field(description="출발일")
    arrival: str = Field(description="도착일")
    airline: str = Field(description="항공사")

    class Config:
        from_attributes = True


class AccommodationInfoDTO(BaseModel):
    """
    skyscanner accomodation info
    """

    name: str = Field(description="숙소 이름")
    stars: str = Field(description="몇 성 호텔인지 (없을 경우에 'no_stars')")
    lowest_price: str = Field(
        description="여러 SKYSCANNER 제휴 숙소 앱 중 해당 숙소를 가장 싸게 예약할 수 있는 가격"
    )
    rating: str = Field(description="리뷰 평균 평점")
    location: str = Field(description="주소")
    latitude: str | None = Field("", description="위도")
    longitude: str | None = Field("", description="경도")

    class Config:
        from_attributes = True


class RestaurantInfo(BaseModel):
    """
    데이터베이스에서 가져온 식당 정보 예시 필드
    - 숙소 관련해서 request response 보내는 api에 따라
    - 가장 우선순위 마지막
    """

    name: str
    cuisine: str
    rating: float

    class Config:
        from_attributes = True


class FestivalInfoDTO(BaseModel):

    title: str = Field(description="축제 이름")
    province: str = Field(description="지역")
    month: int = Field(description="축제가 열리는 달")
    festival_content: str = Field(description="축제 내용")
    festival_content_markdown: str | None = Field(description="축제 내용 마크다운")
    festival_photo: str | None = Field(description="축제 사진")
    latitude: str | None = Field(description="위도")
    longitude: str | None = Field(description="경도")

    class Config:
        from_attributes = True


class PlanComponentDTO(BaseModel):
    component_id: int
    component_type: str
    plane_info: PlaneInfoDTO | None
    accommodation_info: AccommodationInfoDTO | None
    activity: str | None
    festival_info: FestivalInfoDTO | None

    class Config:
        from_attributes = True


class Location(BaseModel):
    name: str = ""
    description: str = ""
    image_url: str = ""
    lat: float
    lon: float


class PlanListDTO(BaseModel):
    trip_plan_id: int | None
    province: str
    created_at: datetime

    class Config:
        from_attributes = True


class PlanDTO(BaseModel):
    trip_plan_id: int | None
    province: str
    created_at: datetime
    plan_component_list: list[PlanComponentDTO]
    locations: list[Location] | None = Field(default_factory=list)

    class Config:
        from_attributes = True


"""
Request, Response DTOs
"""


class FormRequestDTO(BaseModel):
    mbti: str = "F"
    category: list[str] = Field(default_factory=list)
    province: str
    days: int | None | str
    start_date: date | None | str
    trip_member_num: int | None | str
    trip_style_text: str | None


class PlanListResponseDTO(BaseModel):
    plan_list: list[PlanListDTO]


class UserInput(BaseModel):
    plan_id: int
    msg: str


def check_date_format(date_string):
    try:
        datetime.strptime(date_string, "%Y-%m-%d")
        return True  # 문자열이 올바른 날짜 형식
    except ValueError:
        return False  # 문자열이 날짜 형식에 맞지 않음


# Deprecated
class TripInfo(BaseModel):
    mbti: str = "F"
    categories: list[str] = Field(default_factory=list)
    province: str
    days: int | None
    start_date: date | None
    trip_member_num: int | None
    trip_style_text: str | None

    @classmethod
    def from_form_request_dto(cls, form_request_dto: FormRequestDTO) -> "TripInfo":
        try:
            days = form_request_dto.days
            days = int(days)
        except ValueError:
            days = 2

        try:
            trip_member_num = form_request_dto.trip_member_num
            trip_member_num = int(trip_member_num)
        except ValueError:
            trip_member_num = 1

        if not check_date_format(form_request_dto.start_date):
            start_date = datetime.now().date() + 1
        else:
            start_date = form_request_dto.start_date

        return cls(
            mbti=form_request_dto.mbti,
            categories=form_request_dto.category,
            province=form_request_dto.province,
            days=days,
            start_date=start_date,
            trip_member_num=trip_member_num,
            trip_style_text=form_request_dto.trip_style_text,
        )
