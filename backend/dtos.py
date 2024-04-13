from pydantic import BaseModel, Field
from typing import Literal
from datetime import date


class TripInfo(BaseModel):
    mbti: str
    province: Literal['Tokyo']
    days: int
    start_date: date
    trip_member_num: int
    trip_style_text: str
    start_time_preference: Literal['day'] = Field(..., alias='startTimePreference')
